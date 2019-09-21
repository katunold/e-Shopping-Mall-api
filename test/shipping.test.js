import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import { userSignUp } from './helpers/test-setup';

import db from '../src/database/models';

const { expect } = chai;

const shippingModel = db.Shipping;

describe('Shipping routes', () => {
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const getHelper = (error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(shippingModel, 'findAll').throws(['Something went wrong'])
      : sandbox.stub(shippingModel, 'findAll').returns(mockData.shippingInRegion);
    return chai
      .request(app)
      .get('/shipping/regions/2')
      .send();
  };

  it('should return all shipping regions', async () => {
    const response = await getHelper();
    expect(response).to.have.status(200);
  });

  it('should throw an error in case something fails while fetching the shipping regions', async () => {
    const response = await getHelper(true);
    expect(response).to.have.status(500);
  });
});
