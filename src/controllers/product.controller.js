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
import db from '../database/models';
import { Actions } from '../utils/db-actions';
import Validations from '../utils/validation';
import { redisdb } from '../utils/redis';

/**
 * @class ProductController
 */
const op = Op;
class ProductController {
  /**
   * get all products
   */
  static async getAllProducts(req, res, next) {
    const { query, url } = req;
    const productRedisKey = url;
    // eslint-disable-next-line camelcase
    const { page, limit, offset, description_length } = query;
    const sqlQueryMap = {
      limit,
      offset,
    };

    try {
      const prod = await redisdb.get(productRedisKey);
      if (prod) {
        return res.status(200).send(JSON.parse(prod));
      }
      const products = await db.Product.findAndCountAll(sqlQueryMap);
      redisdb.setex(productRedisKey, redisdb.expire, JSON.stringify(products));
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
      return next(error);
    }
  }

  /**
   * get all products by category
   */
  static async getProductsByCategory(req, res, next) {
    const { query, params, url } = req;
    const productsInCategoryRedis = url;
    // eslint-disable-next-line camelcase
    const { page, limit, description_length } = query;
    const { category_id } = params; // eslint-disable-line
    const sqlQueryMap = {
      limit,
      include: [
        {
          model: db.Category,
          foreignKey: 'product_id',
          through: 'ProductCategory',
          where: {
            category_id,
          },
        },
      ],
    };
    try {
      const cachedResponse = await redisdb.get(productsInCategoryRedis);
      if (cachedResponse) {
        return res.status(200).send(JSON.parse(cachedResponse));
      }
      const products = await db.Product.findAndCountAll(sqlQueryMap);
      const descriptionSummary = [];
      if (products) {
        products.rows.forEach(item => {
          // eslint-disable-next-line camelcase,no-param-reassign
          const { product_id, name, description, price, discounted_price, thumbnail } = item;

          const data = {
            product_id,
            name,
            description: description.slice(0, description_length),
            price,
            discounted_price,
            thumbnail,
          };

          descriptionSummary.push(data);
        });

        const returnObj = {
          page,
          rows: descriptionSummary,
        };

        redisdb.setex(productsInCategoryRedis, redisdb.expire, JSON.stringify(returnObj));

        return res.status(200).send(returnObj);
      }

      // eslint-disable-next-line camelcase
      return res
        .status(404)
        .send({ message: `No products attached to category with id ${category_id}` });
      // eslint-disable-next-line no-shadow
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
    const products = [];
    try {
      const cachedResponse = await redisdb.get(req.url);
      if (cachedResponse) {
        return res.status(200).send(JSON.parse(cachedResponse));
      }
      const response = await db.Category.findOne({
        where: {
          department_id,
        },
        attributes: [],
        include: [
          {
            model: db.Product,
            through: 'product_category',
            attributes: [
              'product_id',
              'name',
              'description',
              'price',
              'discounted_price',
              'thumbnail',
            ],
          },
        ],
      });
      if (response) {
        response.Products.forEach(item => {
          // eslint-disable-next-line camelcase
          const { product_id, name, description, price, discounted_price, thumbnail } = item;
          const data = { product_id, name, description, price, discounted_price, thumbnail };
          products.push(data);
        });
        const finalResponse = { rows: products };
        redisdb.setex(req.url, redisdb.expire, JSON.stringify(finalResponse));
        return res.status(200).send(finalResponse);
      }
      // eslint-disable-next-line camelcase
      return res.status(404).send({ message: `department with id ${department_id} not found` });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get single product details
   */

  static async getProduct(req, res, next) {
    const { params, url } = req;  // eslint-disable-line
    try {
      const cachedResponse = await redisdb.get(url);
      if (cachedResponse) {
        return res.status(200).send(JSON.parse(cachedResponse));
      }
      const product = await db.Product.findByPk(params.product_id, {
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
        redisdb.setex(url, redisdb.expire, JSON.stringify(product));
        return res.status(200).send(product);
      }
      return res.status(404).send({ message: 'Product not found' });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * get all departments
   */
  static async getAllDepartments(req, res, next) {
    try {
      const cachedResponse = await redisdb.get(req.url);
      if (cachedResponse) {
        return res.status(200).send(JSON.parse(cachedResponse));
      }
      const response = await db.Department.findAll();
      redisdb.setex(req.url, redisdb.expire, JSON.stringify(response));
      return res.status(200).send(response);
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
    const cachedResponse = await redisdb.get(req.url);
    try {
      if (cachedResponse) {
        return res.status(200).send(JSON.parse(cachedResponse));
      }
      const department = await db.Department.findByPk(department_id);
      redisdb.setex(req.url, redisdb.expire, JSON.stringify(department));
      return department
        ? res.status(200).send(department)
        : res.status(404).send({
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
   */
  static async getAllCategories(req, res, next) {
    // Implement code to get all categories here
    const { url } = req;
    const cachedResponse = await redisdb.get(url);
    if (cachedResponse) {
      return res.status(200).send(JSON.parse(cachedResponse));
    }
    try {
      const response = await db.Category.findAll();
      redisdb.setex(url, redisdb.expire, JSON.stringify(response));
      return res.status(200).send({ rows: response });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get a single category using the categoryId
   */
  static async getSingleCategory(req, res, next) {
    const { category_id } = req.params;  // eslint-disable-line
    // implement code to get a single category here
    const cachedResponse = redisdb.get(req.url);
    if (cachedResponse) {
      return res.status(200).send(JSON.parse(cachedResponse));
    }
    try {
      const response = await db.Category.findByPk(category_id);
      redisdb.setex(req.url, redisdb.expire, JSON.stringify(response));
      return response
        ? res.status(200).send(response)
        : res.status(404).send({ message: `Category with id ${category_id} not found` });
    } catch (error) {
      return next(error);
    }
  }

  /**
   * This method should get list of categories in a department
   */
  static async getDepartmentCategories(req, res, next) {
    // implement code to get categories in a department here
    const { department_id } = req.params;  // eslint-disable-line
    const cachedResponse = redisdb.get(req.url);
    if (cachedResponse) {
      return res.status(200).send(JSON.parse(cachedResponse));
    }
    try {
      const response = await db.Department.findOne({
        where: {
          department_id,
        },
        attributes: [],
        include: [
          {
            model: db.Category,
            foreignKey: 'department_id',
          },
        ],
      });

      if (response) {
        const responseDisplay = { rows: response.Categories };
        redisdb.setex(req.url, redisdb.expire, JSON.stringify(responseDisplay));
        return res.status(200).send(responseDisplay);
      }
      return res
        .status(404)
        .send({ message: `department with id ${department_id} does not exist` });
    } catch (error) {
      return next(error);
    }
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
      const cacheResponse = await redisdb.get(req.url);
      if (cacheResponse) {
        return res.status(200).send(JSON.parse(cacheResponse));
      }
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
        redisdb.setex(req.url, redisdb.expire, JSON.stringify(productReviews));
        return res.status(200).send(productReviews);
      }

      // eslint-disable-next-line camelcase
      return res.status(404).send({ message: `no reviews for product with id ${product_id}` });
      // eslint-disable-next-line no-shadow
    } catch (error) {
      return next(error);
    }
  }

  static async getProductCategory(req, res, next) {
    // eslint-disable-next-line camelcase
    const { product_id } = req.params;
    try {
      const response = await db.Product.findOne({
        where: {
          product_id,
        },
        attributes: [],
        include: [
          {
            model: db.Category,
            through: 'product_category',
            attributes: ['category_id', 'department_id', 'name'],
          },
        ],
      });
      if (response) {
        // eslint-disable-next-line camelcase
        const { category_id, department_id, name } = response.Categories[0];
        return res.status(200).send({ category_id, department_id, name });
      }

      // eslint-disable-next-line camelcase
      return res.status(404).send({ message: `product with id ${product_id} was not found` });
    } catch (error) {
      return next(error);
    }
  }
}

export default ProductController;
