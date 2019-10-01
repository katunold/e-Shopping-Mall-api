/**
 * The controller defined below is the attribute controller, highlighted below are the functions of each static method
 * in the controller
 *  Some methods needs to be implemented from scratch while others may contain one or two bugs
 *
 * - getAllAttributes - This method should return an array of all attributes
 * - getSingleAttribute - This method should return a single attribute using the attribute_id in the request parameter
 * - getAttributeValues - This method should return an array of all attribute values of a single attribute using the attribute id
 * - getProductAttributes - This method should return an array of all the product attributes
 * NB: Check the BACKEND CHALLENGE TEMPLATE DOCUMENTATION in the readme of this repository to see our recommended
 *  endpoints, request body/param, and response object for each of these method
 */
import { error } from 'winston';
import db from '../database/models';

class AttributeController {
  /**
   * This method get all attributes
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAllAttributes(req, res, next) {
    // write code to get all attributes from the database here
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method gets a single attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getSingleAttribute(req, res, next) {
    // Write code to get a single attribute using the attribute id provided in the request param
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method gets a list attribute values in an attribute using the attribute id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getAttributeValues(req, res, next) {
    // Write code to get all attribute values for an attribute using the attribute id provided in the request param
    // This function takes the param: attribute_id
    return res.status(200).json({ message: 'this works' });
  }

  /**
   * This method gets a list attribute values in a product using the product id
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  static async getProductAttributes(req, res, next) {
    // eslint-disable-next-line camelcase
    const { product_id } = req.params;
    const refinedProductAttributes = [];
    try {
      const productAttributes = await db.ProductAttribute.findAll({
        where: {
          product_id,
        },
        attributes: [],
        include: [
          {
            model: db.AttributeValue,
            foreignKey: 'attribute_value_id',
            attributes: ['attribute_value_id', 'value'],
            include: [
              {
                model: db.Attribute,
                as: 'attribute_type',
                foreignKey: 'attribute_id',
                attributes: ['name'],
              },
            ],
          },
        ],
      });

      if (productAttributes.length) {
        productAttributes.forEach(attribute => {
          // eslint-disable-next-line camelcase
          const { attribute_value_id, value, attribute_type } = attribute.AttributeValue;
          const refined = {
            attribute_name: attribute_type.name,
            attribute_value_id,
            attribute_value: value,
          };
          refinedProductAttributes.push(refined);
        });

        return res.status(200).send(refinedProductAttributes);
      }

      // eslint-disable-next-line camelcase
      return (
        res
          .status(404)
          // eslint-disable-next-line camelcase
          .send({ message: `Product with product_id ${product_id} does not exist` })
      );
      // eslint-disable-next-line no-shadow
    } catch (error) {
      return next(error);
    }
  }
}

export default AttributeController;
