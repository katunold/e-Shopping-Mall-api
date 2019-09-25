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
import { error } from 'winston';
import Stripe from 'stripe';
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
   */
  static async addItemToCart(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }

    try {
      const cart = await Actions.addData(db.ShoppingCart, req.body, [
        'cart_id',
        'product_id',
        'attributes',
        'quantity',
      ]);

      return res.status(201).send({ cart });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get shopping cart using the cart_id
   */
  static async getCart(req, res, next) {
    const {cart_id} = req.params;  // eslint-disable-line
    const data = [];
    try {
      const response = await db.ShoppingCart.findAll({
        where: {
          cart_id,
        },
        attributes: ['item_id', 'cart_id', 'product_id', 'quantity'],
        include: [
          {
            model: db.Product,
            foreignKey: 'product_id',
            attributes: ['name', 'image', 'price', 'discounted_price'],
          },
        ],
      });

      if (response.length) {
        response.forEach(obj => {
          // eslint-disable-next-line camelcase,no-shadow
          const { item_id, cart_id, product_id, quantity, Product } = obj;
          const cleanData = {
            item_id,
            cart_id,
            product_id,
            quantity,
            name: Product.name,
            image: Product.image,
            price: Product.price,
            discounted_price: Product.discounted_price,
            sub_total: (Product.price - Product.discounted_price) * quantity,
          };
          data.push(cleanData);
        });

        return res.status(200).send(data);
      }

      return res.status(404).send({
        error: {
          status: 404,
          // eslint-disable-next-line camelcase
          message: `shopping cart with id ${cart_id} does-not exists`,
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * update cart item quantity using the item_id in the request param
   */
  static async updateCartItem(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }
    try {
      const { params, body } = req; // eslint-disable-line
      const cart = await db.ShoppingCart.findByPk(params.item_id);
      if (cart) {
        cart.dataValues.quantity = body.quantity;
        await db.ShoppingCart.update(body, {
          where: {
            item_id: params.item_id,
          },
        });
        return res.status(200).json(cart);
      }
      return res.status(404).send({
        error: {
          status: 404,
          code: 'SPC_1',
          message: `Product with id ${params.item_id} not found`,
        },
      });
      // eslint-disable-next-line no-shadow
    } catch (error) {
      return next(error);
    }
  }

  /**
   * removes all items in a cart
   */
  static async emptyCart(req, res, next) {
    // eslint-disable-next-line camelcase
    const { cart_id } = req.params;
    try {
      const response = await db.ShoppingCart.destroy({
        where: {
          cart_id,
        },
      });
      return response
        ? res.status(200).send([])
        : res.status(404).send({
            error: {
              status: 404,
              code: 'SPC_01',
              // eslint-disable-next-line camelcase
              message: `No products to delete in shopping cart ${cart_id}`,
            },
          });
      // eslint-disable-next-line no-shadow
    } catch (error) {
      return next(error);
    }
  }

  /**
   * remove single item from cart
   * cart id is obtained from current session
   */
  static async removeItemFromCart(req, res, next) {
    const { params, query } = req;
    try {
      const response = await db.ShoppingCart.destroy({
        where: {
          cart_id: query.cart_id,
          item_id: params.item_id,
        },
      });

      return response
        ? res
            .status(200)
            .send({ message: `item ${params.item_id} deleted from cart ${query.cart_id}` })
        : res.status(404).send({
            error: {
              status: 404,
              code: 'SPC_03',
              message: `item with item_id ${params.item_id} not found`,
            },
          });
      // eslint-disable-next-line no-shadow
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
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { email, stripeToken, order_id } = req.body; // eslint-disable-line
    const { customer_id } = req;  // eslint-disable-line
    try {
      // implement code to process payment and send order confirmation email here
      await stripe.charges.create(
        {
          source: stripeToken,
          description: 'I like it',
          amount: 200,
          currency: 'gbp',
        },
        (err, charges) => {
          if (err && err.type === 'StripeCardError') {
            console.log('Your card was declined');
          }
          return res.status(200).send(charges);
        }
      );

      // eslint-disable-next-line no-shadow
    } catch (error) {
      return next(error);
    }
  }
}

export default ShoppingCartController;
