/**
 * The Product controller contains all static methods that handles product request
 * Some methods work fine, some needs to be implemented from scratch while others may contain one or two bugs
 * The static methods and their function include:
 *
 * - getAllProducts - Return a paginated list of products
 * - searchProducts - Returns a list of product that matches the search query string
 * - getProductsByCategory - Returns all products in a product category
 * - getProductsByDepartment - Returns a list of products in a particular department
 * - getProduct - Returns a single product with a matched id in the request params
 * - getAllDepartments - Returns a list of all product departments
 * - getDepartment - Returns a single department
 * - getAllCategories - Returns all categories
 * - getSingleCategory - Returns a single category
 * - getDepartmentCategories - Returns all categories in a department
 *
 *  NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { Op } from 'sequelize';
import { validationResult } from 'express-validator';
import { error } from 'winston';
import db from '../database/models';
import { Actions } from '../utils/db-actions';
import Validations from '../utils/validation';
/**
 * @class ProductController
 */
const op = Op;
class ProductController {
  /**
   * get all products
   */
  static async getAllProducts(req, res, next) {
    const { query } = req;
    // eslint-disable-next-line camelcase
    const { page, limit, offset, description_length } = query;
    const sqlQueryMap = {
      limit,
      offset,
    };

    try {
      const products = await db.Product.findAndCountAll(sqlQueryMap);
      const productCount = products.count;
      const descriptionSummary = [];
      products.rows.forEach(item => {
        // eslint-disable-next-line camelcase,no-param-reassign
        item.description = item.description.slice(0, description_length);
        descriptionSummary.push(item);
      });

      const pageCount = Math.ceil(productCount / limit);
      return res.status(200).send({
        paginationMeta: {
          currentPage: page,
          currentPageSize: limit,
          totalPages: pageCount,
          totalRecords: productCount,
        },
        rows: descriptionSummary,
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * search all products
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and product data
   * @memberof ProductController
   */
  static async searchProduct(req, res, next) {
    // all_words should either be on or off
    // implement code to search product
    const responseData = [];
    const { query } = req;  // eslint-disable-line
    // eslint-disable-next-line camelcase
    const { query_string, all_words } = query;

    const queryOptions =
      // eslint-disable-next-line camelcase
      all_words === 'on'
        ? {
            name: {
              // eslint-disable-next-line camelcase
              [op.like]: [query_string],
            },
          }
        : {
            name: {
              // eslint-disable-next-line camelcase
              [op.substring]: [query_string],
            },
          };
    try {
      const response = await db.Product.findAll({
        where: queryOptions,
      });
      if (response.length) {
        response.forEach(item => {
          delete item.image;
          delete item.image_2;
          delete item.description;
          responseData.push(item);
        });
        return res.status(200).send({ rows: responseData });
      }
      // eslint-disable-next-line camelcase
      return res.status(404).send({ message: `Product with name ${query_string} not found` });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  /**
   * get all products by category
   */
  static async getProductsByCategory(req, res, next) {
    try {
      const { category_id } = req.params; // eslint-disable-line
      const products = await Product.findAndCountAll({
        include: [
          {
            model: Department,
            where: {
              category_id,
            },
            attributes: [],
          },
        ],
        limit,
        offset,
      });
      return next(products);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all products by department
   */
  static async getProductsByDepartment(req, res, next) {
    // implement the method to get products by department
    // eslint-disable-next-line camelcase
    const { department_id } = req.params;
    try {
      const products = await db.Product.findAll({
        where: {
          department_id,
        },
      });
      return res.status(200).send(products);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get single product details
   */

  static async getProduct(req, res, next) {
    const { product_id } = req.params;  // eslint-disable-line
    try {
      const product = await db.Product.findByPk(product_id, {
        include: [
          {
            model: db.AttributeValue,
            as: 'attributes',
            attributes: ['value'],
            through: {
              attributes: [],
            },
            include: [
              {
                model: db.Attribute,
                as: 'attribute_type',
              },
            ],
          },
        ],
      });
      if (product) {
        return res.status(200).send(product);
      }
      return res.status(404).send({ message: 'Product not found' });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all departments
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with status and department list
   * @memberof ProductController
   */
  static async getAllDepartments(req, res, next) {
    try {
      const departments = await Department.findAll();
      return res.status(200).json(departments);
    } catch (error) {
      return next(error);
    }
  }

  /**
   * Get a single department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartment(req, res, next) {
    const { department_id } = req.params; // eslint-disable-line
    try {
      const department = await Department.findByPk(department_id);
      if (department) {
        return res.status(200).json(department);
      }
      return res.status(404).json({
        error: {
          status: 404,
          message: `Department with id ${department_id} does not exist`,  // eslint-disable-line
        },
      });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get all categories
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllCategories(req, res, next) {
    // Implement code to get all categories here
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method should get a single category using the categoryId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleCategory(req, res, next) {
    const { category_id } = req.params;  // eslint-disable-line
    // implement code to get a single category here
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method should get list of categories in a department
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getDepartmentCategories(req, res, next) {
    const { department_id } = req.params;  // eslint-disable-line
    // implement code to get categories in a department here
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * method to post product reviews
   */
  static async postProductReviews(req, res, next) {
    // eslint-disable-next-line camelcase
    const { params, auth } = req;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Validations.errorDisplay(req, res, errors);
    }
    const review = {
      customer_id: auth.sub,
      product_id: params.product_id,
    };
    try {
      const product = await db.Product.findByPk(params.product_id);
      if (product) {
        const response = await Actions.addData(db.Review, Object.assign(review, req.body));
        const displayResponse = {
          name: product.name,
          review: response.review,
          rating: response.rating,
          created_on: response.created_on,
        };

        return res.status(201).send(displayResponse);
      }

      return res
        .status(404)
        .send({ message: `Product with id ${params.product_id} does not exist` });
    } catch (error) {
      return next(error);
    }
  }

  /**
   *  method to get product reviews
   */
  static async getProductReviews(req, res, next) {
    // eslint-disable-next-line camelcase
    const { product_id } = req.params;
    const productReviews = [];
    try {
      const response = await db.Review.findAll({
        where: {
          product_id,
        },
        attributes: ['review', 'rating', 'created_on'],
        include: [
          {
            model: db.Product,
            foreignKey: product_id,
            attributes: ['name'],
          },
        ],
      });

      if (response.length) {
        response.forEach(itemReview => {
          // eslint-disable-next-line camelcase
          const { review, rating, created_on, Product } = itemReview;
          const data = {
            review,
            rating,
            created_on,
            name: Product.name,
          };
          productReviews.push(data);
        });

        return res.status(200).send(productReviews);
      }

      // eslint-disable-next-line camelcase
      return res.status(404).send({ message: `no reviews for product with id ${product_id}` });
      // eslint-disable-next-line no-shadow
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductController;
