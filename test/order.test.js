import chai from 'chai';
import chaihttp from 'chai-http';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import { userSignUp } from './helpers/test-setup';

import db from '../src/database/models';

chai.use(chaihttp);

const { expect } = chai;

const orderModel = db.Order;
const customerModel = db.Customer;

describe('Order route', () => {
  let sandbox;

  beforeEach(done => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const postHelper = async (order, error = false) => {
    sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(orderModel, 'create').throws(['Something went wrong'])
      : sandbox.stub(orderModel, 'create').returns(mockData.orderCreated);
    sandbox.stub(orderModel, 'update').returns(true);
    const accessToken = await userSignUp();
    return chai
      .request(app)
      .post('/orders')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(order);
  };

  const getHelper = async (data, error = false) => {
    sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(orderModel, 'findOne').throws(['something went wrong'])
      : sandbox.stub(orderModel, 'findOne').returns(data);

    const accessToken = await userSignUp();

    return chai
      .request(app)
      .get('/orders/4')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();
  };

  /**
   *  tests to cover creating a new order
   */

  it('should create a new order', async () => {
    const response = await postHelper(mockData.createOrderData);
    expect(response).to.have.status(201);
  });

  it('should return an error when invalid data is submitted', async () => {
    const response = await postHelper(mockData.faultyCreateOrderData);
    expect(response).to.have.status(422);
  });

  it('should throw error in-case something goes wrong while creating order', async () => {
    const response = await postHelper(mockData.createOrderData, true);
    expect(response).to.have.status(500);
  });

  /**
   *  tests to cover fetching a specific order
   */
  it('should return a specific order', async () => {
    const response = await getHelper(mockData.getOrderData);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('order_id');
  });

  it('should return a 404 if order does not exist', async () => {
    const response = await getHelper(null);
    expect(response).to.have.status(404);
  });

  it('should throw an error in the process of getting an order', async () => {
    const response = await getHelper(mockData.getOrderData, true);
    expect(response).to.have.status(500);
  });
});
