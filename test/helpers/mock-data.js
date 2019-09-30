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

exports.addToCartResponse = {
  cart: {
    buy_now: true,
    item_id: 3,
    cart_id: 'c1y4i017ixk0quiosn',
    product_id: '1',
    attributes: 'Small',
    quantity: '10',
    added_on: '2019-09-20T02:02:12.680Z',
  },
};

exports.getShoppingCartProducts = [
  {
    item_id: 1,
    cart_id: 'c1y4i017ixk0quiosn',
    product_id: 1,
    quantity: 10,
    Product: {
      name: "Arc d'Triomphe",
      image: 'arc-d-triomphe.gif',
      price: '14.99',
      discounted_price: '0.00',
    },
  },
  {
    item_id: 1,
    cart_id: 'c1y4i017ixk0quiosn',
    product_id: 1,
    quantity: 10,
    Product: {
      name: "Arc d'Triomphe",
      image: 'arc-d-triomphe.gif',
      price: '14.99',
      discounted_price: '0.00',
    },
  },
  {
    item_id: 1,
    cart_id: 'c1y4i017ixk0quiosn',
    product_id: 1,
    quantity: 10,
    Product: {
      name: "Arc d'Triomphe",
      image: 'arc-d-triomphe.gif',
      price: '14.99',
      discounted_price: '0.00',
    },
  },
];

exports.addProductToShoppingCart = {
  cart_id: 'c1y4i017ixk0quiosn',
  product_id: 1,
  attributes: 'Small',
  quantity: 10,
};

exports.updateProductResponse = {
  dataValues: {
    cart_id: 'c1y4i017ixk0quiosn',
    product_id: 1,
    attributes: 'Small',
    quantity: 10,
  },
};

exports.updateProductQuantity = {
  quantity: 15,
};

exports.faultyUpdateProductQuantity = {
  quantity: 'yfuakbcam',
};

exports.faultyAddProductToShoppingCart = {
  cart_id: '',
  product_id: 1,
  attributes: 'Small',
  quantity: 10,
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

exports.shippingInRegion = {
  shippingTypes: [
    {
      shipping_id: 1,
      shipping_type: 'Next Day Delivery ($20)',
      shipping_cost: '20.00',
      shipping_region_id: 2,
    },
    {
      shipping_id: 2,
      shipping_type: '3-4 Days ($10)',
      shipping_cost: '10.00',
      shipping_region_id: 2,
    },
    {
      shipping_id: 3,
      shipping_type: '7 Days ($5)',
      shipping_cost: '5.00',
      shipping_region_id: 2,
    },
  ],
};

exports.shippingRegions = {
  shippingRegions: [
    {
      shipping_region_id: 1,
      shipping_region: 'Please Select',
    },
    {
      shipping_region_id: 2,
      shipping_region: 'US / Canada',
    },
    {
      shipping_region_id: 3,
      shipping_region: 'Europe',
    },
    {
      shipping_region_id: 4,
      shipping_region: 'Rest of World',
    },
  ],
};

exports.taxData = [
  {
    tax_id: 1,
    tax_type: 'Sales Tax at 8.5%',
    tax_percentage: '8.50',
  },
  {
    tax_id: 2,
    tax_type: 'No Tax',
    tax_percentage: '0.00',
  },
];

exports.products = {
  rows: [
    {
      product_id: 1,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 2,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 3,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 4,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 5,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 6,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 7,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 8,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 9,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 10,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 11,
      name: "Arc d'Triomphe",
      description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
      price: '14.99',
      discounted_price: '0.00',
      image: 'arc-d-triomphe.gif',
      image_2: 'arc-d-triomphe-2.gif',
      thumbnail: 'arc-d-triomphe-thumbnail.gif',
      display: 0,
    },
  ],
};

exports.searchProducts = [
  {
    product_id: 1,
    name: "Arc d'Triomphe",
    description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
    price: '14.99',
    discounted_price: '0.00',
    image: 'arc-d-triomphe.gif',
    image_2: 'arc-d-triomphe-2.gif',
    thumbnail: 'arc-d-triomphe-thumbnail.gif',
    display: 0,
  },
  {
    product_id: 2,
    name: "Arc d'Triomphe",
    description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
    price: '14.99',
    discounted_price: '0.00',
    image: 'arc-d-triomphe.gif',
    image_2: 'arc-d-triomphe-2.gif',
    thumbnail: 'arc-d-triomphe-thumbnail.gif',
    display: 0,
  },
];

exports.productByPk = {
  product_id: 1,
  name: "Arc d'Triomphe",
  description: 'This beautiful and iconic T-shirt will no doubt lead you to your own triumph.',
  price: '14.99',
  discounted_price: '0.00',
  image: 'arc-d-triomphe.gif',
  image_2: 'arc-d-triomphe-2.gif',
  thumbnail: 'arc-d-triomphe-thumbnail.gif',
  display: 0,
};

