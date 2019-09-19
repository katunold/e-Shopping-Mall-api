exports.signUpData = {
  name: 'arnold',
  email: 'katunold94@gmail.com',
  password: '1qaz2wsx',
};

exports.signUpDataWithMissingFields = {
  email: 'katumba@mail.com',
  password: '1qaz2wsx',
};

exports.faultyLoginData = {
  email: '',
  password: '1qaz2wsx',
};

exports.loginData = {
  email: 'katumba@mail.com',
  password: '1qaz2wsx',
};

exports.expectedOneResult = {
  dataValues: {
    shipping_region_id: 1,
    customer_id: 20,
    name: 'Arnold',
    email: 'katunold94@gmail.com',
    password: '$2b$08$mHXLCZj5vidKzlm0YPHIfuvLHxLa2T.C/i7/J9vvBtDPetQESZ/X2',
  },
};

exports.createOrderData = {
  cart_id: '2',
  shipping_id: 1,
  tax_id: 1,
};

exports.faultyCreateOrderData = {
  cart_id: '2',
  shipping_id: '1qw',
  tax_id: 1,
};

exports.orderCreated = {
  created_on: '2019-09-19T02:35:26.703Z',
  total_amount: 0,
  status: 0,
  order_id: 6,
  shipping_id: '1',
  tax_id: '1',
  customer_id: 26,
};

exports.getOrderData = {
  order_id: 6,
  orderItems: [],
};

exports.getCustomerOrders = [
  {
    order_id: 3,
    total_amount: '0.00',
    created_on: '2019-09-19T01:59:45.000Z',
    shipped_on: null,
    Customer: { name: 'Arnold' },
  },
  {
    order_id: 4,
    total_amount: '0.00',
    created_on: '2019-09-19T01:59:45.000Z',
    shipped_on: null,
    Customer: { name: 'Arnold' },
  },
  {
    order_id: 4,
    total_amount: '0.00',
    created_on: '2019-09-19T01:59:45.000Z',
    shipped_on: null,
    Customer: { name: 'Arnold' },
  },
  {
    order_id: 5,
    total_amount: '0.00',
    created_on: '2019-09-19T01:59:45.000Z',
    shipped_on: null,
    Customer: { name: 'Arnold' },
  },
];

exports.updateCustomerDetails = {
  email: 'arnold@gmail.com',
  name: 'arnold',
};

exports.updateCustomerAddress = {
  country: 'Kenya',
};

exports.updateCustomerCreditCard = {
  credit_card: '234r3ysrdtduh7i7y8foghiyaguakt',
};

exports.faultyUpdateCustomerAddress = {
  country: '***************Kenya**********',
};

exports.faultyUpdateCustomerDetails = {
  email: 'arnold',
  name: 'arnold',
};

exports.faultyUpdateCustomerCreditCard = {
  credit_card: '234r3ysrdtduh!!!!!!',
};

exports.unExpectedUpdateCustomerDetailsFields = {
  country: 'Uganda',
};

exports.customer = {
  customer_id: 26,
  name: 'Arnold',
  email: 'katunold94@gmail.com',
  credit_card: null,
  address_1: null,
  address_2: null,
  city: null,
  region: null,
  postal_code: null,
  country: 'Uganda',
  shipping_region_id: 1,
  day_phone: '0706180670',
  eve_phone: '0706180655',
  mob_phone: null,
  facebook_id: null,
};
