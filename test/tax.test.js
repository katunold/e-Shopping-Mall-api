import chai from 'chai';
import sinon from 'sinon';
import app from '../src';
import mockData from './helpers/mock-data';
import db from '../src/database/models';
import { redisdb } from '../src/utils/redis';

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

  const getTaxHelper = async (error = false, method = 'findAll', data = mockData.taxData, route = '/tax') => {
    // eslint-disable-next-line no-unused-expressions
    error
      ? sandbox.stub(taxModel, method).throws(['something went wrong'])
      : sandbox.stub(taxModel, method).returns(data);

    return chai
      .request(app)
      .get(route)
      .send();
  };

  it('should return all taxes', async () => {
    sandbox.stub(redisdb, 'get').returns(null);
    sandbox.stub(redisdb, 'setex').returns('OK');
    const response = await getTaxHelper();
    expect(response).to.have.status(200);
  });

  it('should return all taxes from cache memory', async () => {
    sandbox.stub(redisdb, 'get').returns(JSON.stringify(mockData.taxData));
    const response = await getTaxHelper();
    expect(response).to.have.status(200);
  });

  it('should throw error if something goes wrong', async () => {
    sandbox.stub(redisdb, 'get').returns(null);
    sandbox.stub(redisdb, 'setex').returns('OK');
    const response = await getTaxHelper(true);
    expect(response).to.have.status(500);
  });

  /**
   *  tests to cover fetching a single tax
   */

  it('should return a single order', async () => {
    const response = await getTaxHelper(false, 'findOne', mockData.taxData[1], '/tax/1');
    expect(response).to.have.status(200);
  });

  it('should return a 404 if tax is not found', async () => {
    const response = await getTaxHelper(false, 'findOne', null, '/tax/1');
    expect(response).to.have.status(404);
  });

  it('should throw an error if something goes wrong during the process getting a single tax', async () => {
    const response = await getTaxHelper(true, 'findOne', null, '/tax/1');
    expect(response).to.have.status(500);
  });
});
