import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import db from '../src/database/models';

const { expect } = chai;
const shoppingCartModel = db.ShoppingCart;

describe('Shopping-cart route', () => {
  let sandbox;
  let myStub;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const addProductHelper = async (data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(shoppingCartModel, 'create').throws(['Something went wrong'])
      : sandbox.stub(shoppingCartModel, 'create').returns(mockData.addProductToShoppingCart);
    return chai
      .request(app)
      .post('/shoppingcart/add')
      .send(data);
  };

  const getProductHelper = async (data, error = false) => {
    myStub = error
      ? sinon.stub(shoppingCartModel, 'findAll').throws(['something went wrong'])
      : sinon.stub(shoppingCartModel, 'findAll').returns(data);

    return chai
      .request(app)
      .get('/shoppingcart/c1y4i017ixk0quiosn')
      .send();
  };

  /**
   * tests to cover generating a unique cart id
   */

  it('should return a generate unique cart id', async () => {
    const response = await chai
      .request(app)
      .get('/shoppingcart/generateUniqueId')
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('cart_id');
  });

  /**
   * tests to cover adding a product to a shopping cart
   */

  it('should add a product to a shopping cart', async () => {
    const response = await addProductHelper(mockData.addProductToShoppingCart);
    expect(response).to.have.status(201);
    expect(response.body).to.have.property('cart');
  });

  it('should return an error if invalid data is submitted', async () => {
    const response = await addProductHelper(mockData.faultyAddProductToShoppingCart);
    expect(response).to.have.status(422);
    expect(response.body).to.have.property('error');
  });

  it('should throw an error in case something goes wrong while adding a product to the cart', async () => {
    const response = await addProductHelper(mockData.addProductToShoppingCart, true);
    expect(response).to.have.status(500);
  });

  /**
   * tests to cover fetching products in a shopping cart
   */
  it('should return all products in a shopping cart', async () => {
    const response = await getProductHelper(mockData.getShoppingCartProducts);
    expect(response).to.have.status(200);
  });

  it('should return 404 if the shopping cart does-not exist', async () => {
    myStub.restore();
    const response = await getProductHelper([]);
    expect(response).to.have.status(404);
  });

  it('should throw an error when something goes wrong', async () => {
    myStub.restore();
    const response = await getProductHelper(mockData.getShoppingCartProducts, true);
    expect(response).to.have.status(500);
  });
});
