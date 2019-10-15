import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';
import { redisdb } from '../src/utils/redis';

const { expect } = chai;
const productModel = db.Product;
const categoryModel = db.Category;
const departmentModel = db.Department;

describe('Products route', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach('Restore sandbox', () => {
    sandBox.restore();
  });

  const searchHelper = (route, data, model, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandBox.stub(model, 'findAll').throws(['something went wrong'])
      : sandBox.stub(model, 'findAll').returns(data);
    return chai
      .request(app)
      .get(route)
      .send();
  };

  // eslint-disable-next-line no-shadow
  const getByPkHelper = (data, route, model, error = false) => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandBox.stub(model, 'findByPk').throws(['something went wrong'])
      : sandBox.stub(model, 'findByPk').returns(data);

    return chai
      .request(app)
      .get(route)
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
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('OK');
    const response = await chai
      .request(app)
      .get('/products?page=1&limit=5&description_length=50')
      .send();
    expect(response).to.have.status(200);
  });

  it('should get all products form redis cache', async () => {
    sandBox.stub(redisdb, 'get').returns(JSON.stringify(mockData.products));
    const response = await chai
      .request(app)
      .get('/products?page=1&limit=5&description_length=50')
      .send();
    expect(response).to.have.status(200);
  });

  it('should throw an error if something goes wrong', async () => {
    sandBox.stub(productModel, 'findAndCountAll').throws(['Something went wrong']);
    sandBox.stub(redisdb, 'get').returns(null);
    const response = await chai
      .request(app)
      .get('/products?page=1&limit=5&description_length=50')
      .send();
    expect(response).to.have.status(500);
  });

  it('should return a product on search', async () => {
    const response = await searchHelper(
      '/products/search?query_string=cat&all_words=off',
      mockData.searchProducts,
      productModel
    );
    expect(response).to.have.status(200);
  });

  it('should return a 404 if no item is found', async () => {
    const response = await searchHelper(
      '/products/search?query_string=cat&all_words=on',
      [],
      productModel
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong', async () => {
    const response = await searchHelper(
      '/products/search?query_string=cat&all_words=on',
      mockData.searchProducts,
      productModel,
      true
    );
    expect(response).to.have.status(500);
  });

  it('should find and return a product by product_id', async () => {
    const response = await getByPkHelper(mockData.productByPk, '/products/16', productModel);
    expect(response).to.have.status(200);
  });

  it('should return a 404 if a product is not found', async () => {
    const response = await getByPkHelper(null, '/products/16', productModel);
    expect(response).to.have.status(404);
  });

  it('should throw an error in case something went wrong', async () => {
    const response = await getByPkHelper(null, '/products/16', productModel, true);
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

  it('should return all departments', async () => {
    const response = await searchHelper('/departments', mockData.searchProducts, departmentModel);
    expect(response).to.have.status(200);
  });

  it('should throw an error if thing are not right', async () => {
    const response = await searchHelper(
      '/departments',
      mockData.searchProducts,
      departmentModel,
      true
    );
    expect(response).to.have.status(500);
  });

  it('should find and return a department by department_id', async () => {
    const response = await getByPkHelper(mockData.productByPk, '/departments/2', departmentModel);
    expect(response).to.have.status(200);
  });

  it('should return 404 if department is not found', async () => {
    const response = await getByPkHelper(null, '/departments/2', departmentModel);
    expect(response).to.have.status(404);
  });

  it('should find and return a department by department_id', async () => {
    const response = await getByPkHelper(
      mockData.productByPk,
      '/departments/2',
      departmentModel,
      true
    );
    expect(response).to.have.status(500);
  });
});
