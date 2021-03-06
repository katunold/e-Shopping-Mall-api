import { Router } from 'express';
import ShoppingCartController from '../../controllers/shoppingCart.controller';
import { requireSignIn } from '../../utils/jwt';
import Validations from '../../utils/validation';

const router = Router();
router.get('/shoppingcart/generateUniqueId', ShoppingCartController.generateUniqueCart);
router.post(
  '/shoppingcart/add',
  Validations.validity('add-to-cart'),
  ShoppingCartController.addItemToCart
);
router.get('/shoppingcart/:cart_id', ShoppingCartController.getCart);
router.put(
  '/shoppingcart/update/:item_id',
  Validations.validateUpdateDetails,
  Validations.validity('update-product-quantity'),
  ShoppingCartController.updateCartItem
);
router.delete('/shoppingcart/empty/:cart_id', ShoppingCartController.emptyCart);
router.delete('/shoppingcart/removeProduct/:item_id', ShoppingCartController.removeItemFromCart);
router.post('/orders', requireSignIn, Validations.validity(), ShoppingCartController.createOrder);
router.get('/orders/inCustomer', requireSignIn, ShoppingCartController.getCustomerOrders);
router.get('/orders/:order_id', requireSignIn, ShoppingCartController.getOrder);
router.get('/orders/shortDetail/:order_id', requireSignIn, ShoppingCartController.getOrderSummary);
router.post('/stripe/charge', requireSignIn, ShoppingCartController.processStripePayment);

export default router;
