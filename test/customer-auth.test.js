import chai from 'chai';
import chaihttp from 'chai-http';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import { userSignUp } from './helpers/test-setup';

import db from '../src/database/models';

chai.use(chaihttp);

const { expect } = chai;

const customerModel = db.Customer;

describe('Sign-up route', () => {
  let sandbox;

  beforeEach(done => {
    sandbox = sinon.createSandbox();
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
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
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
    sandbox.stub(customerModel, 'findOne').returns(mockData.expectedOneResult);
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
    sandbox.stub(customerModel, 'findOne').returns(mockData.expectedOneResult);
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

  it('should return users details', async () => {
    sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    sandbox.stub(customerModel, 'findByPk').returns(mockData.expectedOneResult);
    const accessToken = await userSignUp();

    const fetchUserDetails = await chai
      .request(app)
      .get('/customer')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(fetchUserDetails).to.have.status(200);
    expect(fetchUserDetails.body).to.have.property('customer');
  });

  it('should throw an error when something goes wrong while retrieving user details ', async () => {
    sandbox.stub(customerModel, 'findOne').returns(null);
    sandbox.stub(customerModel, 'create').returns(mockData.expectedOneResult);
    sandbox.stub(customerModel, 'findByPk').throws(['Something went wrong']);

    const accessToken = await userSignUp();

    const fetchUserDetails = await chai
      .request(app)
      .get('/customer')
      .set({ Authorization: `Bearer ${accessToken}` })
      .send();

    expect(fetchUserDetails).to.have.status(500);
    expect(fetchUserDetails.body).to.have.property('error');
  });
});
