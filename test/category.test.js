import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';

const { expect } = chai;
const productModel = db.Product;

describe('Category routes', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach('Restore sandbox', () => {
    sandBox.restore();
  });

  const getCategoryProductsHelper = (data, error = false) => {
    error
      ? sandBox.stub(productModel, 'findAndCountAll').throws(['Something went wrong'])
      : sandBox.stub(productModel, 'findAndCountAll').returns(data);

    return chai
      .request(app)
      .get('/products/inCategory/3?page=1&limit=20&description_length=50')
      .send();
  };

  it('should return all products in a specific product', async () => {
    const response = await getCategoryProductsHelper(mockData.productsInCategory);
    expect(response).to.have.status(200);
  });

  it('should return 404 if category not found', async () => {
    const response = await getCategoryProductsHelper(null);
    expect(response).to.have.status(404);
  });

  it('should throw an error in case something goes wrong', async () => {
    const response = await getCategoryProductsHelper(null, true);
    expect(response).to.have.status(500);
  });
});
