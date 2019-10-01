import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';
import { userSignUp } from './helpers/test-setup';

const { expect } = chai;
const productAttributeModal = db.ProductAttribute;

describe('Attribute routes', () => {
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const getProductAttributesHelper = (data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(productAttributeModal, 'findAll').throws(['Something went wrong'])
      : sandbox.stub(productAttributeModal, 'findAll').returns(data);
    return chai
      .request(app)
      .get('/attributes/inProduct/15')
      .send();
  };

  it('should return all attributes of a specific product', async () => {
    const response = await getProductAttributesHelper(mockData.productAttributes);
    expect(response).to.have.status(200);
  });

  it('should return 404 when a product is not found', async () => {
    const response = await getProductAttributesHelper([]);
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await getProductAttributesHelper(mockData.productAttributes, true);
    expect(response).to.have.status(500);
  });
});
