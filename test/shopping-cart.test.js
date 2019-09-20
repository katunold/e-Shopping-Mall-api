import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import db from '../src/database/models';

const { expect } = chai;
const shoppingCartModel = db.ShoppingCart;

describe('Shopping-cart route', () => {
  let sandbox;

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

  it('should return a generate unique cart id', async () => {
    const response = await chai
      .request(app)
      .get('/shoppingcart/generateUniqueId')
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('cart_id');
  });

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
});
