import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import { userSignUp } from './helpers/test-setup';

import db from '../src/database/models';

const { expect } = chai;

const orderModel = db.Order;
const customerModel = db.Customer;

describe('Order route', () => {
  let sandbox;
  let accessToken;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
    sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    accessToken = await userSignUp();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const postOrderHelper = async (order, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(orderModel, 'create').throws(['Something went wrong'])
      : sandbox.stub(orderModel, 'create').returns(mockData.orderCreated);
    sandbox.stub(orderModel, 'update').returns(true);

    return chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(order);
  };

  const getOrderHelper = async (data, stubMethod, route, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(orderModel, stubMethod).throws(['something went wrong'])
      : sandbox.stub(orderModel, stubMethod).returns(data);

    return chai
      .request(app)
      .get(route)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
  };

  /**
   *  tests to cover creating a new order
   */

  it('should create a new order', async () => {
    const response = await postOrderHelper(mockData.createOrderData);
    expect(response).to.have.status(201);
  });

  it('should return an error when invalid data is submitted', async () => {
    const response = await postOrderHelper(mockData.faultyCreateOrderData);
    expect(response).to.have.status(422);
  });

  it('should throw error in-case something goes wrong while creating order', async () => {
    const response = await postOrderHelper(mockData.createOrderData, true);
    expect(response).to.have.status(500);
  });

  /**
   *  tests to cover fetching a specific order
   */
  it('should return a specific order', async () => {
    const response = await getOrderHelper(mockData.getOrderData, 'findOne', '/orders/4');
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('order_id');
  });

  it('should return a 404 if order does not exist', async () => {
    const response = await getOrderHelper(null, 'findOne', '/orders/4');
    expect(response).to.have.status(404);
  });

  it('should throw an error in the process of getting an order', async () => {
    const response = await getOrderHelper(mockData.getOrderData, 'findOne', '/orders/4', true);
    expect(response).to.have.status(500);
  });

  /**
   *  tests to cover fetching orders from a specific customer
   */
  it('should return all orders from a specific client', async () => {
    const response = await getOrderHelper(
      mockData.getCustomerOrders,
      'findAll',
      '/orders/inCustomer'
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if no orders are found', async () => {
    const response = await getOrderHelper([], 'findAll', '/orders/inCustomer');
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong while fetching orders', async () => {
    const response = await getOrderHelper(
      mockData.getCustomerOrders,
      'findAll',
      '/orders/inCustomer',
      true
    );
    expect(response).to.have.status(500);
  });

  /**
   *  tests to cover fetching an order summary
   */
  it('should return a single order summary', async () => {
    const response = await getOrderHelper(
      mockData.getCustomerOrders[2],
      'findOne',
      '/orders/shortDetail/4'
    );
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('order_id');
  });

  it('should return 404 if order not found', async () => {
    const response = await getOrderHelper(
      mockData.getCustomerOrders[10],
      'findOne',
      '/orders/shortDetail/10'
    );
    expect(response).to.have.status(404);
    expect(response.body).to.have.property('error');
  });

  it('should throw an error if something goes wrong while fetching the order summary', async () => {
    const response = await getOrderHelper(
      mockData.getCustomerOrders[2],
      'findOne',
      '/orders/shortDetail/4',
      true
    );
    expect(response).to.have.status(500);
  });

});
