import { Router } from 'express';
import passport from 'passport';
import CustomerController from '../../controllers/customer.controller';
import Validations from '../../utils/validation';
import { requireSignIn, hasAuthorization } from '../../utils/jwt';

const passportFacebook = passport.authenticate('facebookToken', { session: false });

const router = Router();
router.post('/customers', CustomerController.updateCreditCard);
router.post('/customers/signup', Validations.validity('sign-up'), CustomerController.create);
router.post('/customers/login', Validations.validity('login'), CustomerController.login);
router.post('/customers/facebook', passportFacebook, CustomerController.facebookLogin);
router.get('/customer', requireSignIn, CustomerController.getCustomerProfile);
router.put(
  '/customer',
  requireSignIn,
  hasAuthorization,
  Validations.validateUpdateDetails,
  Validations.validity('update-user-details'),
  CustomerController.updateCustomerProfile
);
router.put(
  '/customer/address',
  requireSignIn,
  hasAuthorization,
  Validations.validateUpdateDetails,
  Validations.validity('update-address'),
  CustomerController.updateCustomerAddress
);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
