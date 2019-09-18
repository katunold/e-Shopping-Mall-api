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
import { Op } from 'sequelize';
import { validationResult } from 'express-validator';
import db from '../database/models';
import { Actions } from '../utils/db-actions';
import { signToken } from '../utils/jwt';
import Validations from '../utils/validation';

/**
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
          [CustomerController.op.and]: [req.body.email],
        },
      },
    });

    if (newUser) {
      return res.status(400).send({
        error: {
          status: 400,
          code: 'USR_04',
          message: 'The email already exists.',
          field: 'email',
        },
      });
    }

    const userData = await Actions.addData(db.Customer, req.body, ['name', 'email', 'password']);
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
        email,
      },
    });

    if (!userData) {
      return res.status(404).send({
        status: 404,
        code: 'USR_05',
        message: "The email doesn't exist",
        field: 'email',
      });
    }

    if (await db.Customer.validatePassword(password, userData.dataValues.password)) {
      return CustomerController.authenticated(userData, res, 200);
    }

    return res.status(400).send({
      status: 400,
      code: 'USR_01',
      message: 'Email or Password is invalid.',
      field: 'email or password',
    });
  }

  /**
   * facebook login
   */
  static async facebookLogin(req, res) {
    const { user } = req;
    return CustomerController.authenticated(user, res, 200);
  }

  /**
   * get customer profile data
   */
  static async getCustomerProfile(req, res, next) {
    const { sub } = req.auth; // eslint-disable-line
    try {
      const customer = await db.Customer.findByPk(sub);
      return res.status(200).json({
        customer,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update customer profile data such as name, email, password, day_phone, eve_phone and mob_phone
   */
  static async updateCustomerProfile(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }
    return CustomerController.update(req, res, next);
  }

  /**
   * update customer profile data such as address_1, address_2, city, region, postal_code, country and shipping_region_id
   */
  static async updateCustomerAddress(req, res, next) {
    // write code to update customer address info such as address_1, address_2, city, region, postal_code, country
    // and shipping_region_id
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    return CustomerController.update(req, res, next);
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

    const { token, exp, iat } = signToken(data.dataValues.customer_id);

    return res.status(statusCode).json({
      customer: data,
      accessToken: token,
      expiresIn: exp - iat,
    });
  };

  static update = async (req, res, next) => {
    try {
      await db.Customer.update(req.body, {
        where: {
          customer_id: req.auth.sub,
        },
      });
      const { customer } = req;
      const updatedUser = Object.assign(customer, req.body);

      return res.status(200).send(updatedUser);
    } catch (error) {
      return next(error);
    }
  };
}

export default CustomerController;
