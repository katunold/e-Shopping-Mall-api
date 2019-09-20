import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import { userSignUp } from './helpers/test-setup';

import db from '../src/database/models';

const { expect } = chai;

const customerModel = db.Customer;

describe('customer route', () => {
  let sandbox;

  beforeEach(done => {
    sandbox = sinon.createSandbox();
    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const helper = async (updateData, error, route = '/customer') => {
    const sand = sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    error
      ? sandbox.stub(customerModel, 'update').throws(['Something went wrong'])
      : sandbox.stub(customerModel, 'update').returns(true);
    const accessToken = await userSignUp();
    sand.restore();
    sandbox.stub(customerModel, 'findOne').returns(mockData.expectedOneResult);
    return chai
      .request(app)
      .put(route)
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(updateData);
  };

  /**
   * tests to cover updating user details
   */

  it('should update user details', async () => {
    const response = await helper(mockData.updateCustomerDetails, false);
    expect(response).to.have.status(200);
  });

  it('should return an error message if update data is invalid', async () => {
    const response = await helper(mockData.faultyUpdateCustomerDetails, false);
    expect(response).to.have.status(422);
  });

  it('should return an error if an expected fields are submitted', async () => {
    const response = await helper(mockData.unExpectedUpdateCustomerDetailsFields, false);
    expect(response).to.have.status(422);
  });

  it('should throw an error if something goes ', async () => {
    const response = await helper(mockData.updateCustomerDetails, true);
    expect(response).to.have.status(500);
  });

  /**
   * tests to cover updating user address
   */

  it('should update customer address ', async () => {
    const response = await helper(mockData.updateCustomerAddress, false, '/customer/address');
    expect(response).to.have.status(200);
  });

  it('should throw an error if if invalid address data is submitted ', async () => {
    const response = await helper(mockData.faultyUpdateCustomerAddress, false, '/customer/address');
    expect(response).to.have.status(422);
  });

  /**
   * tests to cover updating user credit card
   */
  it('should update customer credit card ', async () => {
    const response = await helper(mockData.updateCustomerCreditCard, false, '/customer/creditCard');
    expect(response).to.have.status(200);
  });

  it('should throw an error if invalid credit card data is submitted ', async () => {
    const response = await helper(
      mockData.faultyUpdateCustomerCreditCard,
      false,
      '/customer/creditCard'
    );
    expect(response).to.have.status(422);
  });
});
