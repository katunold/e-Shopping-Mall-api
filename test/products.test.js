import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';

const { expect } = chai;
const productModel = db.Product;
const categoryModel = db.Category;

describe('Products route', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach('Restore sandbox', () => {
    sandBox.restore();
  });

  const searchHelper = (route, data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandBox.stub(productModel, 'findAll').throws(['something went wrong'])
      : sandBox.stub(productModel, 'findAll').returns(data);
    return chai
      .request(app)
      .get(route)
      .send();
  };

  // eslint-disable-next-line no-shadow
  const getByPkHelper = (data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandBox.stub(productModel, 'findByPk').throws(['something went wrong'])
      : sandBox.stub(productModel, 'findByPk').returns(data);

    return chai
      .request(app)
      .get('/products/16')
      .send();
  };

  const getDepartmentProductsHelper = (data, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandBox.stub(categoryModel, 'findOne').throws(['Something went wrong'])
      : sandBox.stub(categoryModel, 'findOne').returns(data);

    return chai
      .request(app)
      .get('/products/inDepartment/2')
      .send();
  };

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

  it('should return a product on search', async () => {
    const response = await searchHelper(
      '/products/search?query_string=cat&all_words=off',
      mockData.searchProducts
    );
    expect(response).to.have.status(200);
  });

  it('should return a 404 if no item is found', async () => {
    const response = await searchHelper('/products/search?query_string=cat&all_words=on', []);
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await searchHelper(
      '/products/search?query_string=cat&all_words=on',
      mockData.searchProducts,
      true
    );
    expect(response).to.have.status(500);
  });

  it('should find and return a product by product_id', async () => {
    const response = await getByPkHelper(mockData.productByPk);
    expect(response).to.have.status(200);
  });

  it('should return a 404 if a product is not found', async () => {
    const response = await getByPkHelper(null);
    expect(response).to.have.status(404);
  });

  it('should throw an error in case something went wrong', async () => {
    const response = await getByPkHelper(null, true);
    expect(response).to.have.status(500);
  });

  it('should return all products attached to a specific department', async () => {
    const response = await getDepartmentProductsHelper(mockData.departmentProducts);
    expect(response).to.have.status(200);
  });

  it('should return 404 if department is not found', async () => {
    const response = await getDepartmentProductsHelper(null);
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await getDepartmentProductsHelper(mockData.departmentProducts, true);
    expect(response).to.have.status(500);
  });
});
