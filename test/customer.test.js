import chai from 'chai';
import chaihttp from 'chai-http';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';

import db from '../src/database/models';

chai.use(chaihttp);

const { expect } = chai;

const customerModel = db.Customer;

describe('Sign-up route', () => {
  let sandbox;
  let expectedResult;
  let expectedOneResult;

  beforeEach(done => {
    sandbox = sinon.createSandbox();
    expectedOneResult = {
      dataValues: {
        shipping_region_id: 1,
        customer_id: 20,
        name: 'Arnold',
        email: 'katunold94@gmail.com',
        password: '$2b$08$mHXLCZj5vidKzlm0YPHIfuvLHxLa2T.C/i7/J9vvBtDPetQESZ/X2',
      },
    };

    done();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  it('should create new user account', done => {
    sandbox.stub(customerModel, 'findAll').returns(null);
    sandbox.stub(customerModel, 'create').returns(expectedOneResult);
    chai
      .request(app)
      .post('/customers/signup')
      .send(mockData.signUpData)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should return an error if user email already exists', done => {
    sandbox.stub(customerModel, 'findAll').returns(true);
    chai
      .request(app)
      .post('/customers/signup')
      .send(mockData.signUpData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return an error if user info is invalid', (done) => {
    sandbox.stub(customerModel, 'findAll').returns(null);
    chai
      .request(app)
      .post('/customers/signup')
      .send(mockData.signUpDataWithMissingFields)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
});
