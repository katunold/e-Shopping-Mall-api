import { Router } from 'express';
import passport from 'passport';
import CustomerController from '../../controllers/customer.controller';
import Validations from '../../utils/validation';

const passportFacebook = passport.authenticate('facebookToken', { session: false });

const router = Router();
router.post('/customers', CustomerController.updateCreditCard);
router.post('/customers/signup', Validations.validity('sign-up'), CustomerController.create);
router.post('/customers/login', Validations.validity('login'), CustomerController.login);
router.post('/customers/facebook', passportFacebook, CustomerController.facebookLogin);
router.get('/customer', CustomerController.getCustomerProfile);
router.put('/customer', CustomerController.apply);
router.put('/customer/address', CustomerController.updateCustomerAddress);
router.put('/customer/creditCard', CustomerController.updateCreditCard);

export default router;
