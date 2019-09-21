import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import db from '../src/database/models';
const { expect } = chai;
const taxModel = db.Tax;

describe('Tax route', () => {
  let sandbox;

  beforeEach(async () => {
    sandbox = sinon.createSandbox();
  });

  afterEach('restore sandbox', () => {
    sandbox.restore();
  });

  it('should return all taxes', async () => {
    sandbox.stub(taxModel, 'findAll').returns(mockData.taxData);
    const response = await chai
      .request(app)
      .get('/tax')
      .send();

    expect(response).to.have.status(200);
  });
});
