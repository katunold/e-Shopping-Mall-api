import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../src';

chai.use(chaihttp);

const { expect } = chai;

describe('Shopping-cart route', () => {
  it('should return a generate unique cart id', async () => {
    const response = await chai
      .request(app)
      .get('/shoppingcart/generateUniqueId')
      .send();

    expect(response).to.have.status(200);
    expect(response.body).to.have.property('cart_id');
  });
});
