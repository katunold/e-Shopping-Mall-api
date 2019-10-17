import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';
import { redisdb } from '../src/utils/redis';

const { expect } = chai;
const productModel = db.Product;
const deparmentModel = db.Department;
const categoryModel = db.Category;

describe('Category routes', () => {
  let sandBox;
  beforeEach(() => {
    sandBox = sinon.createSandbox();
  });

  afterEach('Restore sandbox', () => {
    sandBox.restore();
  });

  const getCategoryProductsHelper = (data, error = false, cachedData = null) => {
    error
      ? sandBox.stub(productModel, 'findAndCountAll').throws(['Something went wrong'])
      : sandBox.stub(productModel, 'findAndCountAll').returns(data);
    sandBox.stub(redisdb, 'get').returns(cachedData);
    sandBox.stub(redisdb, 'setex').returns('OK');

    return chai
      .request(app)
      .get('/products/inCategory/3?page=1&limit=20&description_length=50')
      .send();
  };

  const getProductCategoryHelper = (data, model, route, method, error = false) => {
    error
      ? sandBox.stub(model, method).throws(['Something went wrong'])
      : sandBox.stub(model, method).returns(data);
    return chai
      .request(app)
      .get(route)
      .send();
  };

  it('should return all categories', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('OK');
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories',
      'findAll'
    );
    expect(response).to.have.status(200);
  });

  it('should return data from the cache', async () => {
    sandBox.stub(redisdb, 'get').returns(JSON.stringify(mockData.productCategory));
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories',
      'findAll'
    );
    expect(response).to.have.status(200);
  });

  it('should throw an error incase something is wrong while fetching all categories', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('OK');
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories',
      'findAll',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return a single category', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('ok');
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories/1',
      'findByPk'
    );
    expect(response).to.have.status(200);
  });

  it('should return cached a response', async () => {
    sandBox.stub(redisdb, 'get').returns(JSON.stringify(mockData.productCategory));
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories/1',
      'findByPk'
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if a category is not found', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    const response = await getProductCategoryHelper(
      null,
      categoryModel,
      '/categories/1',
      'findByPk'
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error in case something goes wrong while fetching categories', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('ok');
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories/1',
      'findByPk',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return all products in a specific category', async () => {
    const response = await getCategoryProductsHelper(mockData.productsInCategory);
    expect(response).to.have.status(200);
  });

  it('should return all from the cache storage', async () => {
    const response = await getCategoryProductsHelper(
      mockData.productsInCategory,
      false,
      JSON.stringify(mockData.productsInCategory)
    );
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

  it("should return a specific product's category ", async () => {
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      productModel,
      '/categories/inProduct/9',
      'findOne'
    );
    expect(response).to.have.status(200);
  });

  it('should return a 404 if product does not exist ', async () => {
    const response = await getProductCategoryHelper(
      null,
      productModel,
      '/categories/inProduct/9',
      'findOne'
    );
    expect(response).to.have.status(404);
  });

  it('should return 500 if something goes wrong in the process', async () => {
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      productModel,
      '/categories/inProduct/9',
      'findOne',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return all categories in a department', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('OK');
    const response = await getProductCategoryHelper(
      mockData.departmentCategories,
      deparmentModel,
      '/categories/inDepartment/1',
      'findOne'
    );
    expect(response).to.have.status(200);
  });

  it('should return all categories in a department from a cache storage', async () => {
    sandBox.stub(redisdb, 'get').returns(JSON.stringify(mockData.departmentCategories));
    const response = await getProductCategoryHelper(
      mockData.departmentCategories,
      deparmentModel,
      '/categories/inDepartment/1',
      'findOne'
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if department is not found', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    const response = await getProductCategoryHelper(
      null,
      deparmentModel,
      '/categories/inDepartment/1',
      'findOne'
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error in case something goes wrong', async () => {
    sandBox.stub(redisdb, 'get').returns(null);
    sandBox.stub(redisdb, 'setex').returns('OK');
    const response = await getProductCategoryHelper(
      mockData.departmentCategories,
      deparmentModel,
      '/categories/inDepartment/1',
      'findOne',
      true
    );
    expect(response).to.have.status(500);
  });
});
