import { body } from 'express-validator';

export default class Validations {
  static validity = context => {
    switch (context) {
      case 'sign-up':
        return [
          body('email', 'Provide a valid email').isEmail(),
          body('name', 'Username is required')
            .exists()
            .not()
            .isEmpty(),
          body('password', 'Password is required')
            .exists()
            .not()
            .isEmpty(),
          body('password', 'Password should be a minimum of 8 characters').isLength({ min: 8 }),
        ];
      case 'login':
        return [
          body('email', 'email is required')
            .exists()
            .not()
            .isEmpty(),
          body('password', 'Password is required')
            .exists()
            .not()
            .isEmpty(),
        ];
      case 'update-user-details':
        return [
          body('email', 'invalid email')
            .isEmail()
            .optional(),
          body('name', 'name should only contain alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('day_phone', 'only string of numbers not less than 10 or more than 12')
            .isMobilePhone('en-UG')
            .optional(),
          body('eve_phone', 'only string of numbers not less than 10 or more than 12')
            .isMobilePhone('en-UG')
            .optional(),
          body('mob_phone', 'only string of numbers not less than 10 or more than 12')
            .isMobilePhone('en-UG')
            .optional(),
        ];
      case 'update-address':
        return [
          body('address_1', 'only alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('address_2', 'only alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('city', 'only alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('region', 'only alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('postal_code', 'only alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('country', 'only alphanumeric characters')
            .isAlphanumeric()
            .optional(),
          body('shipping_region_id', 'only alphanumeric characters')
            .isNumeric()
            .optional(),
        ];
      case 'update-credit-card':
        return [
          body('credit_card', 'only alphanumeric characters')
            .trim()
            .isAlphanumeric()
            .optional(),
        ];
      case 'update-product-quantity':
        return [
          body('quantity', 'only numeric values allowed')
            .trim()
            .isNumeric(),
          body('quantity', 'quantity is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
        ];
      case 'add-to-cart':
        return [
          body('cart_id', 'only alphanumeric characters')
            .trim()
            .isAlphanumeric(),
          body('product_id', 'only numeric characters')
            .trim()
            .isNumeric(),
          body('attributes', 'only alphanumeric characters')
            .trim()
            .isAlphanumeric(),
          body('quantity', 'only numeric characters')
            .trim()
            .isNumeric(),
          body('cart_id', 'cart_id is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
          body('product_id', 'product_id is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
          body('attributes', 'attributes is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
          body('quantity', 'quantity is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
        ];
      case 'product-review':
        return [
          body('review', 'review is required')
            .trim()
            .escape()
            .exists()
            .not()
            .isEmpty(),
          body('rating', 'rating is required')
            .trim()
            .escape()
            .exists()
            .not()
            .isEmpty(),
          body('rating', 'min is 1 max is 5').matches(/^([1-5])$/),
        ];
      default:
        return [
          body('cart_id', 'cart_id is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
          body('cart_id', 'only alphanumeric characters')
            .trim()
            .isAlphanumeric(),
          body('shipping_id', 'shipping_id is required')
            .trim()
            .exists()
            .not()
            .isEmpty(),
          body('shipping_id', 'only numeric characters')
            .trim()
            .isNumeric(),
          body('tax_id', 'only numeric characters')
            .trim()
            .isNumeric(),
          body('tax_id', 'tax_id is required')
            .exists()
            .not()
            .isEmpty(),
        ];
    }
  };

  static validateUpdateDetails = (req, res, next) => {
    const { url } = req;
    let upDateFields;
    switch (url) {
      case '/customer/address':
        upDateFields = {
          address_1: 'address_1',
          address_2: 'address_2',
          city: 'city',
          region: 'region',
          postal_code: 'postal_code',
          country: 'country',
          shipping_region_id: 'shipping_region_id',
        };
        break;
      case '/customer/creditCard':
        upDateFields = {
          credit_card: 'credit_card',
        };
        break;
      case '/customer':
        upDateFields = {
          email: 'email',
          name: 'name',
          day_phone: 'day_phone',
          eve_phone: 'eve_phone',
          mob_phone: 'mob_phone',
        };
        break;
      default:
        upDateFields = {
          quantity: 'quantity',
        };
    }

    const keys = Object.keys(req.body);
    keys.forEach(key => {
      if (!(key in upDateFields)) {
        return res.status(422).send({
          error: {
            status: 422,
            code: 'USR_12',
            message: 'Not all Fields can be updated',
            only_update: upDateFields,
          },
        });
      }
      next();
    });
  };

  static errorDisplay = (req, res, errors) => {
    const errorArr = [];

    errors.array().forEach(error => {
      const errData = {
        status: 422,
        code: 'USR_10',
        message: error.msg,
        field: error.param,
      };
      errorArr.push(errData);
    });
    return res.status(422).json({ error: errorArr });
  };
}
