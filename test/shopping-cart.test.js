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

  const getProductHelper = async (data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(shoppingCartModel, 'findAll').throws(['something went wrong'])
      : sandbox.stub(shoppingCartModel, 'findAll').returns(data);

    return chai
      .request(app)
      .get('/shoppingcart/c1y4i017ixk0quiosn')
      .send();
  };

  // eslint-disable-next-line camelcase
  const upDateProductQuantityHelper = async (db_data, req_data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(shoppingCartModel, 'findByPk').throws(['Something went wrong'])
      : sandbox.stub(shoppingCartModel, 'findByPk').returns(db_data);
    sandbox.stub(shoppingCartModel, 'update').returns(true);
    return chai
      .request(app)
      .put('/shoppingcart/update/1')
      .send(req_data);
  };

  const deleteProductsHelper = async (deleted, error=false) => {
    error
      ? sandbox.stub(shoppingCartModel, 'destroy').throws(['something went wrong'])
      : sandbox.stub(shoppingCartModel, 'destroy').returns(deleted);

    return chai
      .request(app)
      .delete('/shoppingcart/empty/werefqwerefr')
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
    const response = await getProductHelper([]);
    expect(response).to.have.status(404);
  });

  it('should throw an error when something goes wrong', async () => {
    const response = await getProductHelper(mockData.getShoppingCartProducts, true);
    expect(response).to.have.status(500);
  });

  /**
   * tests to cover updating the quantity of a product in the shopping cart
   */
  it('should update the quantity of a product in a given shopping cart', async () => {
    const response = await upDateProductQuantityHelper(
      mockData.updateProductResponse,
      mockData.updateProductQuantity
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if product does not exist', async () => {
    const response = await upDateProductQuantityHelper(null, mockData.updateProductQuantity);
    expect(response).to.have.status(404);
  });

  it('should return an error if invalid data is submitted', async () => {
    const response = await upDateProductQuantityHelper(
      mockData.updateProductResponse,
      mockData.faultyUpdateProductQuantity
    );
    expect(response).to.have.status(422);
  });

  it('should throw an error in case something goes wrong', async () => {
    const response = await upDateProductQuantityHelper(
      mockData.updateProductResponse,
      mockData.updateProductQuantity,
      true
    );
    expect(response).to.have.status(500);
  });

  /**
   *  tests to cover deleting items in a given shopping cart
   */
  it('should delete all products in a given shopping cart', async () => {
    const response = await deleteProductsHelper(true);
    expect(response).to.have.status(200);
  });

  it('should return an error in case there are no products to delete', async () => {
    const response = await deleteProductsHelper(false);
    expect(response).to.have.status(404);
  });

  it('should throw an error if something wrong during the deletion process', async () => {
    const response = await deleteProductsHelper(true, true);
    expect(response).to.have.status(500);
  });
});
