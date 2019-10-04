import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';

const { expect } = chai;
const productAttributeModal = db.ProductAttribute;
const attributeValueModel = db.AttributeValue;
const attributeModel = db.Attribute;

describe('Attribute routes', () => {
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  const getProductAttributesHelper = (route, data, model, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(model, 'findAll').throws(['Something went wrong'])
      : sandbox.stub(model, 'findAll').returns(data);
    return chai
      .request(app)
      .get(route)
      .send();
  };

  it('should return attributes', async () => {
    const response = await getProductAttributesHelper(
      '/attributes',
      mockData.productAttributes,
      attributeModel
    );
    expect(response).to.have.status(200);
  });

  it('should throw an error if something goes wrong while retrieving all attributes', async () => {
    const response = await getProductAttributesHelper(
      '/attributes',
      mockData.productAttributes,
      attributeModel,
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return all attributes of a specific product', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/inProduct/15',
      mockData.productAttributes,
      productAttributeModal
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 when a product is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/inProduct/15',
      [],
      productAttributeModal
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/inProduct/15',
      mockData.productAttributes,
      productAttributeModal,
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return a specific attribute values', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/values/1',
      mockData.attributeValues,
      attributeValueModel
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if attribute is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/values/1',
      [],
      attributeValueModel
    );
    expect(response).to.have.status(404);
  });

  it('should return 404 if attribute is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/values/1',
      mockData.attributeValues,
      attributeValueModel,
      true
    );
    expect(response).to.have.status(500);
  });
});
