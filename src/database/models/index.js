/* eslint-disable import/no-dynamic-require */
/* eslint-disable prefer-template */
/* eslint-disable no-path-concat */
/* eslint-disable dot-notation */
import dotenv from 'dotenv';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

dotenv.config();

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
  Customer: sequelize.import('./customer'),
  Order: sequelize.import('./order'),
  Product: sequelize.import('./product'),
  OrderDetail: sequelize.import('./orderDetail'),
  ShoppingCart: sequelize.import('./shoppingCart'),
  ShippingRegion: sequelize.import('./shippingRegion'),
  Shipping: sequelize.import('./shipping'),
  AttributeValue: sequelize.import('./attributeValue'),
  Attribute: sequelize.import('./attribute'),
  Tax: sequelize.import('./tax'),
  ProductAttribute: import('./productAttribute'),
  Review: import('./review'),
  Department: import('./department'),
  Category: import('./category'),
  ProductCategory: import('./productCategory'),
};

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
