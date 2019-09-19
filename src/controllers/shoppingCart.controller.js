/**
 * Check each method in the shopping cart controller and add code to implement
 * the functionality or fix any bug.
 * The static methods and their function include:
 *
 * - generateUniqueCart - To generate a unique cart id
 * - addItemToCart - To add new product to the cart
 * - getCart - method to get list of items in a cart
 * - updateCartItem - Update the quantity of a product in the shopping cart
 * - emptyCart - should be able to clear shopping cart
 * - removeItemFromCart - should delete a product from the shopping cart
 * - createOrder - Create an order
 * - getCustomerOrders - get all orders of a customer
 * - getOrder - get the details of an order
 * - processStripePayment - process stripe payment
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */

import { validationResult } from 'express-validator';
import uniqid from 'uniqid';
import db from '../database/models';
import { Actions } from '../utils/db-actions';
import Validations from '../utils/validation';

/**
 *
 *
 * @class shoppingCartController
 */
class ShoppingCartController {
  /**
   * generate random unique id for cart identifier
   */
  static generateUniqueCart(req, res) {
    // implement method to generate unique cart Id
    return res.status(200).send({ cart_id: uniqid() });
  }

  /**
   * adds item to a cart with cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async addItemToCart(req, res, next) {
    // implement function to add item to cart
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * get shopping cart using the cart_id
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async getCart(req, res, next) {
    // implement method to get cart items
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * update cart item quantity using the item_id in the request param
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async updateCartItem(req, res, next) {
    const { item_id } = req.params // eslint-disable-line
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * removes all items in a cart
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with cart
   * @memberof ShoppingCartController
   */
  static async emptyCart(req, res, next) {
    // implement method to empty cart
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * remove single item from cart
   * cart id is obtained from current session
   *
   * @static
   * @param {obj} req express request object
   * @param {obj} res express response object
   * @returns {json} returns json response with message
   * @memberof ShoppingCartController
   */
  static async removeItemFromCart(req, res, next) {
    try {
      // implement code to remove item from cart here
    } catch (error) {
      return next(error);
    }
  }

  /**
   * create an order from a cart
   */
  static async createOrder(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    const { sub } = req.auth;
    const customer = {
      customer_id: sub,
    };
    Object.assign(req.body, customer);
    try {
      const orderData = await Actions.addData(db.Order, req.body, [
        'cart_id',
        'shipping_id',
        'tax_id',
        'customer_id',
      ]);
      return res.status(201).send({ order_id: orderData.order_id });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * return all orders placed by a specific customer
   */
  static async getCustomerOrders(req, res, next) {
    const { sub } = req.auth;  // eslint-disable-line
    const data = [];
    try {
      const orders = await db.Order.findAll({
        where: {
          customer_id: sub,
        },
        attributes: ['order_id', 'total_amount', 'created_on', 'shipped_on'],
        include: [{ model: db.Customer, attributes: ['name'] }],
      });
      if (orders.length) {
        orders.forEach(obj => {
          // eslint-disable-next-line camelcase
          const { order_id, total_amount, created_on, shipped_on, Customer } = obj;
          const cleanData = {
            order_id,
            total_amount,
            created_on,
            shipped_on,
            name: Customer.name,
          };
          data.push(cleanData);
        });

        return res.status(200).send(data);
      }

      return res.status(404).send({
        error: {
          status: 404,
          code: 'ORD_01',
          message: 'orders not found',
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * return a single order
   */
  static async getOrder(req, res, next) {
    const { order_id } = req.params;  // eslint-disable-line
    const { sub } = req.auth;
    try {
      const orderResponse = await db.Order.findOne({
        where: {
          order_id,
          customer_id: sub,
        },
        attributes: ['order_id'],
        include: [{ model: db.OrderDetail, as: 'orderItems' }],
      });
      return orderResponse
        ? res.status(200).send(orderResponse)
        : res.status(404).send({
            error: {
              status: 404,
              code: 'ORD_01',
              // eslint-disable-next-line camelcase
              message: `order_id ${order_id} does not exist in your orders`,
            },
          });
    } catch (error) {
      return next(error);
    }
  }

  static async getOrderSummary(req, res, next) {
    let cleanData;
    const { order_id } = req.params;  // eslint-disable-line
    const { sub } = req.auth;
    try {
      const orderResponse = await db.Order.findOne({
        where: {
          order_id,
          customer_id: sub,
        },
        attributes: ['order_id', 'total_amount', 'created_on', 'shipped_on', 'status'],
        include: [{ model: db.Customer, attributes: ['name'] }],
      });
      if (orderResponse) {
        // eslint-disable-next-line camelcase,no-shadow
        const { order_id, total_amount, created_on, shipped_on, Customer } = orderResponse;
        cleanData = {
          order_id,
          total_amount,
          created_on,
          shipped_on,
          name: Customer.name,
        };
        return res.status(200).send(cleanData);
      }

      return res.status(404).send({
        error: {
          status: 404,
          code: 'ORD_01',
          message: 'order not found',
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async processStripePayment(req, res, next) {
    const { email, stripeToken, order_id } = req.body; // eslint-disable-line
    const { customer_id } = req;  // eslint-disable-line
    try {
      // implement code to process payment and send order confirmation email here
    } catch (error) {
      return next(error);
    }
  }
}

export default ShoppingCartController;
