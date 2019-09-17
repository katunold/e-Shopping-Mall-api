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

  /*
  tests to cover user sign-up
   */

  it('should create new user account', done => {
    sandbox.stub(customerModel, 'findOne').returns(null);
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
    sandbox.stub(customerModel, 'findOne').returns(true);
    chai
      .request(app)
      .post('/customers/signup')
      .send(mockData.signUpData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return an error if user info is invalid', done => {
    chai
      .request(app)
      .post('/customers/signup')
      .send(mockData.signUpDataWithMissingFields)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });

  /*
  tests to cover user login
   */
  it('should login a user', done => {
    sandbox.stub(customerModel, 'findOne').returns(expectedOneResult);
    sandbox.stub(customerModel, 'validatePassword').returns(true);
    chai
      .request(app)
      .post('/customers/login')
      .send(mockData.loginData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return an error message if no account is registered with a given email', done => {
    sandbox.stub(customerModel, 'findOne').returns(null);
    chai
      .request(app)
      .post('/customers/login')
      .send(mockData.loginData)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it('should return error if email or password do not match', done => {
    sandbox.stub(customerModel, 'findOne').returns(expectedOneResult);
    sandbox.stub(customerModel, 'validatePassword').returns(false);
    chai
      .request(app)
      .post('/customers/login')
      .send(mockData.loginData)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should return error message if login user input is faulty', done => {
    chai
      .request(app)
      .post('/customers/login')
      .send(mockData.faultyLoginData)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });
});
