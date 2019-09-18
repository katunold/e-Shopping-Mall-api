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
      default:
        return [
          body('contactNumber', 'Contact number is required')
            .exists()
            .not()
            .isEmpty(),
          body('password', 'Password is required')
            .exists()
            .not()
            .isEmpty(),
        ];
    }
  };

  static validateUpdateDetails = (req, res, next) => {
    const upDateFields = {
      email: 'email',
      name: 'name',
      day_phone: 'day_phone',
      eve_phone: 'eve_phone',
      mob_phone: 'mob_phone',
    };
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
