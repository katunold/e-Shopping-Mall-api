import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';
import { userSignUp } from './helpers/test-setup';
import { error } from 'winston';

const { expect } = chai;
const productModel = db.Product;
const reviewModel = db.Review;
const customerModel = db.Customer;

describe('Review routes', () => {
  let sandBox;
  let accessToken;

  beforeEach(async () => {
    sandBox = sinon.createSandbox();
    sandBox.stub(customerModel, 'findOne').returns(null);
    sandBox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    accessToken = await userSignUp();
  });

  afterEach('Restore sandbox', () => {
    sandBox.restore();
  });

  const postReviewHelper = (reviewData, productFilter, reviewResponse, error=false ) => {
    sandBox.restore();
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandBox.stub(productModel, 'findByPk').throws(['Something went wrong'])
      : sandBox.stub(productModel, 'findByPk').returns(productFilter);
    sandBox.stub(reviewModel, 'create').returns(reviewResponse);
    return chai
      .request(app)
      .post('/products/5/reviews')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send(reviewData);
  };

  it('should submit a product review', async () => {
    const response = await postReviewHelper(
      mockData.productReview,
      mockData.findProductByPk,
      mockData.reviewProductResponse
    );
    expect(response).to.have.status(201);
  });

  it('should return a 404 if the product is not found', async () => {
    const response = await postReviewHelper(mockData.productReview, null);
    expect(response).to.have.status(404);
  });

  it('should return a 422 in case of a wrong input', async () => {
    const response = await postReviewHelper(mockData.erroredProductReview);
    expect(response).to.have.status(422);
  });

  it('should throw an error incase something goes wrong', async () => {
    const response = await postReviewHelper(mockData.productReview, null, null, true);
    expect(response).to.have.status(500);
  });
});
