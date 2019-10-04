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

  const getProductAttributesHelper = (route, data, model, method, error = false) => {
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
      attributeModel,
      'findAll'
    );
    expect(response).to.have.status(200);
  });

  it('should throw an error if something goes wrong while retrieving all attributes', async () => {
    const response = await getProductAttributesHelper(
      '/attributes',
      mockData.productAttributes,
      attributeModel,
      'findAll',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return all attributes of a specific product', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/inProduct/15',
      mockData.productAttributes,
      productAttributeModal,
      'findAll'
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 when a product is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/inProduct/15',
      [],
      productAttributeModal,
      'findAll'
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/inProduct/15',
      mockData.productAttributes,
      productAttributeModal,
      'findAll',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return a specific attribute values', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/values/1',
      mockData.attributeValues,
      attributeValueModel,
      'findAll'
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if attribute is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/values/1',
      [],
      attributeValueModel,
      'findAll'
    );
    expect(response).to.have.status(404);
  });

  it('should return 404 if attribute is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/values/1',
      mockData.attributeValues,
      attributeValueModel,
      'findAll',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return a specific attribute', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/1',
      mockData.productAttributes,
      attributeModel,
      'findByPk'
    );

    expect(response).to.have.status(200);
  });

  it('should return 404 if attribute is not found', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/1',
      null,
      attributeModel,
      'findByPk'
    );

    expect(response).to.have.status(404);
  });

  it('should throw an error in case something goes wrong while fetching an attribute', async () => {
    const response = await getProductAttributesHelper(
      '/attributes/1',
      mockData.productAttributes,
      attributeModel,
      'findByPk',
      true
    );

    expect(response).to.have.status(500);
  });
});
