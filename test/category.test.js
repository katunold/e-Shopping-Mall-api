import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';
import { error } from 'winston';

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

  const getCategoryProductsHelper = (data, error = false) => {
    error
      ? sandBox.stub(productModel, 'findAndCountAll').throws(['Something went wrong'])
      : sandBox.stub(productModel, 'findAndCountAll').returns(data);

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
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories',
      'findAll'
    );
    expect(response).to.have.status(200);
  });

  it('should throw an error incase something is wrong while fetching all categories', async () => {
    const response = await getProductCategoryHelper(
      mockData.productCategory,
      categoryModel,
      '/categories',
      'findAll',
      true
    );
    expect(response).to.have.status(500);
  });

  it('should return all products in a specific category', async () => {
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
    const response = await getProductCategoryHelper(
      mockData.departmentCategories,
      deparmentModel,
      '/categories/inDepartment/1',
      'findOne'
    );
    expect(response).to.have.status(200);
  });

  it('should return 404 if department is not found', async () => {
    const response = await getProductCategoryHelper(
      null,
      deparmentModel,
      '/categories/inDepartment/1',
      'findOne'
    );
    expect(response).to.have.status(404);
  });

  it('should throw an error in case something goes wrong', async () => {
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
