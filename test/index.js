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

export { sinon, app, mockData, userSignUp, expect, customerModel };
