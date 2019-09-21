import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import { userSignUp } from './helpers/test-setup';

import db from '../src/database/models';

const { expect } = chai;

const shippingModel = db.Shipping;
const shippingRegionModel = db.ShippingRegion;

describe('Shipping routes', () => {
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const getHelper = (error = false, model = shippingModel, route = '/shipping/regions/2') => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(model, 'findAll').throws(['Something went wrong'])
      : sandbox.stub(model, 'findAll').returns(mockData.shippingInRegion);
    return chai
      .request(app)
      .get(route)
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

  it('should return all shipping regions', async () => {
    const response = await getHelper(false, shippingRegionModel, '/shipping/regions');
    expect(response).to.have.status(200);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await getHelper(true, shippingRegionModel, '/shipping/regions');
    expect(response).to.have.status(500);
  });
});
