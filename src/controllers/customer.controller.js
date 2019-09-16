/**
 * Customer controller handles all requests that has to do with customer
 * Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - create - allow customers to create a new account
 * - login - allow customers to login to their account
 * - getCustomerProfile - allow customers to view their profile info
 * - updateCustomerProfile - allow customers to update their profile info like name, email, password, day_phone, eve_phone and mob_phone
 * - updateCustomerAddress - allow customers to update their address info
 * - updateCreditCard - allow customers to update their credit card number
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import db from '../database/models';
import Customer  from '../database/models/customer';
import { Op } from 'sequelize';
import { Actions } from '../utils/db-actions';
import { signToken } from '../utils/jwt';
import { validationResult } from 'express-validator';
import Validations from '../utils/validation';

/**
 *
 *
 * @class CustomerController
 */
class CustomerController {

  static op = Op;

  /**
   * create a customer record
   */
  static async create(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    const newUser = await db.Customer.findOne({
      where: {
        email: {
          [CustomerController.op.and]: [req.body.email]
        }
      }
    });


    if (newUser) {
      return res.status(400).send({
        error: {
          status: 400,
          code: "USR_04",
          message: 'The email already exists.',
          field: "email"
        }
      })
    }

    const userData = await Actions.addData(db.Customer, req.body, [
      "name",
      "email",
      "password"
    ]);
    CustomerController.authenticated(userData, res, 201);
  }

  /**
   * log in a customer
   */

  static async login(req, res) {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    const { email, password } = req.body;

    const userData = await db.Customer.findOne({
      where: {
        email: email,
      }
    });

    if (!userData) {
      return res.status(404).send({
        status: 404,
        code: 'USR_05',
        message: 'The email doesn\'t exist',
        field: 'email'});
    }

    if (await db.Customer.validatePassword(password, userData.dataValues.password)){
      return CustomerController.authenticated(userData, res, 200);
    }

    return res.status(400).send({
      status: 400,
      code: 'USR_01',
      message: 'Email or Password is invalid.',
      field: 'email or password'});
  }

  /**
   * get customer profile data
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async getCustomerProfile(req, res, next) {
    // fix the bugs in this code
    const { customer_id } = req;  // eslint-disable-line
    try {
      const customer = await Customer.findByPk(customer_id);
      return res.status(400).json({
        customer,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerProfile(req, res, next) {
    // Implement function to update customer profile like name, day_phone, eve_phone and mob_phone
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * update customer credit card
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status customer profile data
   * @memberof CustomerController
   */
  static async updateCreditCard(req, res, next) {
    // write code to update customer credit card number
    return res.status(200).json({ message: 'this works' });
  }

  static authenticated = (data, res, statusCode) => {
    Object.assign(data, {
      address_1: null,
      address_2: null,
      city: null,
      region: null,
      postal_code: null,
      credit_card: null,
      day_phone: null,
      eve_phone: null,
      mob_phone: null,
    });

    delete data.dataValues.password;

    const { token, exp } = signToken(data.dataValues.customer_id);

    return res.status(statusCode).json({
      customer: data,
      accessToken: token,
      expiresIn: exp - new Date().getTime()
    });
  }

}

export default CustomerController;
