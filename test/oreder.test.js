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

  const helper = async (order, error=false) => {
    sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
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

  it('should create a new order', async () => {
    const response = await helper(mockData.createOrderData);
    expect(response).to.have.status(201);
  });

  it('should return an error when invalid data is submitted', async () => {
    const response = await helper(mockData.faultyCreateOrderData);
    expect(response).to.have.status(422);
  });

  it('should throw error in-case something goes wrong while creating order', async () => {
    const response = await helper(mockData.createOrderData, true);
    expect(response).to.have.status(500);
  });
});
