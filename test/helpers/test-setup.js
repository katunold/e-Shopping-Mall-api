import chai from 'chai';
import app from '../../src';
import mockData from './mock-data';

const userSignUp = async () => {
  const signupResponse = await chai
    .request(app)
    .post('/customers/signup')
    .send(mockData.signUpData);

  const { accessToken } = signupResponse.body;

  return accessToken;
};

// eslint-disable-next-line import/prefer-default-export
export { userSignUp };
