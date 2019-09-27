import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';

const { expect } = chai;
const productModel = db.Product;

describe('Products route', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach('Restore sandbox', () => {
    sandBox.restore();
  });

  it('should get all products from the database', async () => {
    sandBox.stub(productModel, 'findAndCountAll').returns(mockData.products);
    const response = await chai
      .request(app)
      .get('/products?page=1&limit=5&description_length=50')
      .send();
    expect(response).to.have.status(200);
  });

  it('should throw an error if something goes wrong', async () => {
    sandBox.stub(productModel, 'findAndCountAll').throws(['Something went wrong']);
    const response = await chai
      .request(app)
      .get('/products?page=1&limit=5&description_length=50')
      .send();
    expect(response).to.have.status(500);
  });
});
