import { body } from "express-validator";

export default class Validations {

  static validity = (context) => {

    switch (context) {
      case 'sign-up':
        return [
          body('email', 'Provide a valid email').isEmail(),
          body('name', 'Username is required').exists().not().isEmpty(),
          body('password', 'Password is required').exists().not().isEmpty(),
          body('password', 'Password should be a minimum of 8 characters').isLength({ min: 8 })
        ];
      case 'login':
        return [
          body('email', 'email is required').exists().not().isEmpty(),
          body('password', 'Password is required').exists().not().isEmpty()
        ];
      default:
        return [
          body('contactNumber', 'Contact number is required').exists().not().isEmpty(),
          body('password', 'Password is required').exists().not().isEmpty()
        ];
    }
  }

}
