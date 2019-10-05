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

exports.productAttributes = [
  {
    AttributeValue: {
      attribute_value_id: 1,
      value: 'S',
      attribute_type: {
        name: 'Size',
      },
    },
  },
  {
    AttributeValue: {
      attribute_value_id: 2,
      value: 'M',
      attribute_type: {
        name: 'Size',
      },
    },
  },
  {
    AttributeValue: {
      attribute_value_id: 3,
      value: 'L',
      attribute_type: {
        name: 'Size',
      },
    },
  },
  {
    AttributeValue: {
      attribute_value_id: 4,
      value: 'XL',
      attribute_type: {
        name: 'Size',
      },
    },
  },
];

exports.attributeValues = [
  {
    attribute_value_id: 6,
    value: 'White',
  },
  {
    attribute_value_id: 7,
    value: 'Black',
  },
];

exports.productReview = {
  review: 'This is a world class product',
  rating: 4,
};

exports.erroredProductReview = {
  review: 'This is a world class product',
  rating: 8,
};

exports.findProductByPk = {
  product_id: 9,
  name: 'Corsica',
  description: `Borrowed from Spain, the "Moor's head" may have celebrated the Christians' victory over the Moslems in that country.`,
  price: '22.00',
  discounted_price: '0.00',
  image: 'corsica.gif',
  image_2: 'corsica-2.gif',
  thumbnail: 'corsica-thumbnail.gif',
  display: 0,
};

exports.reviewProductResponse = {
  review_id: 6,
  customer_id: 26,
  product_id: '9',
  review: 'This is a world class product',
  rating: '4',
  created_on: '2019-10-02T06:54:19.620Z',
};

exports.productReviews = [
  {
    review: 'This is a world class product',
    rating: 4,
    created_on: '2019-10-02T06:54:19.000Z',
    Product: {
      name: 'Corsica',
    },
  },
];

exports.productsInCategory = {
  counts: 2,
  rows: [
    {
      product_id: 29,
      name: 'Irish Coat of Arms',
      description:
        "This was one of the first stamps of the new Irish Republic, and it makes a T-shirt you'll be proud to wear on St. Paddy's Day!",
      price: '14.99',
      discounted_price: '0.00',
      image: 'irish-coat-of-arms.gif',
      image_2: 'irish-coat-of-arms-2.gif',
      thumbnail: 'irish-coat-of-arms-thumbnail.gif',
      display: 0,
    },
    {
      product_id: 12,
      name: 'Irish Coat of Arms',
      description:
        "This was one of the first stamps of the new Irish Republic, and it makes a T-shirt you'll be proud to wear on St. Paddy's Day!",
      price: '14.99',
      discounted_price: '0.00',
      image: 'irish-coat-of-arms.gif',
      image_2: 'irish-coat-of-arms-2.gif',
      thumbnail: 'irish-coat-of-arms-thumbnail.gif',
      display: 0,
    },
  ],
};

exports.productCategory = {
  Categories: [
    {
      category_id: 1,
      department_id: 1,
      name: 'French',
      ProductCategory: {
        product_id: 9,
        category_id: 1,
      },
    },
  ],
};

exports.departmentCategories = {
  rows: [
    {
      category_id: 1,
      department_id: 1,
      name: 'French',
      description:
        "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!",
    },
    {
      category_id: 2,
      department_id: 1,
      name: 'Italian',
      description:
        "The full and resplendent treasure chest of art, literature, music, and science that Italy has given the world is reflected splendidly in its postal stamps. If we could, we would dedicate hundreds of T-shirts to this amazing treasure of beautiful images, but for now we will have to live with what you see here. You don't have to be Italian to love these gorgeous T-shirts, just someone who appreciates the finer things in life!",
    },
    {
      category_id: 3,
      department_id: 1,
      name: 'Irish',
      description:
        "It was Churchill who remarked that he thought the Irish most curious because they didn't want to be English. How right he was! But then, he was half-American, wasn't he? If you have an Irish genealogy you will want these T-shirts! If you suddenly turn Irish on St. Patrick's Day, you too will want these T-shirts! Take a look at some of the coolest T-shirts we have!",
    },
  ],
};

exports.departmentProducts = {
  Products: [
    {
      product_id: 36,
      name: 'Visit the Zoo',
      description:
        'This WPA poster is a wonderful example of the art produced by the Works Projects Administration during the Depression years. Do you feel like you sometimes live or work in a zoo? Then this T-shirt is for you!',
      price: '20.00',
      discounted_price: '16.95',
      thumbnail: 'visit-the-zoo-thumbnail.gif',
      ProductCategory: {
        product_id: 36,
        category_id: 4,
      },
    },
    {
      product_id: 37,
      name: 'Sambar',
      description:
        'This handsome Malayan Sambar was a pain in the neck to get to pose like this, and all so you could have this beautiful retro animal T-shirt!',
      price: '19.00',
      discounted_price: '17.99',
      thumbnail: 'sambar-thumbnail.gif',
      ProductCategory: {
        product_id: 37,
        category_id: 4,
      },
    },
    {
      product_id: 38,
      name: 'Buffalo',
      description:
        'Of all the critters in our T-shirt zoo, this is one of our most popular. A classic animal T-shirt for an individual like yourself!',
      price: '14.99',
      discounted_price: '0.00',
      thumbnail: 'buffalo-thumbnail.gif',
      ProductCategory: {
        product_id: 38,
        category_id: 4,
      },
    },
    {
      product_id: 39,
      name: 'Mustache Monkey',
      description:
        "This fellow is more than equipped to hang out with that tail of his, just like you'll be fit for hanging out with this great animal T-shirt!",
      price: '20.00',
      discounted_price: '17.95',
      thumbnail: 'mustache-monkey-thumbnail.gif',
      ProductCategory: {
        product_id: 39,
        category_id: 4,
      },
    },
    {
      product_id: 40,
      name: 'Colobus',
      description:
        'Why is he called "Colobus," "the mutilated one"? He doesn\'t have a thumb, just four fingers! He is far from handicapped, however; his hands make him the great swinger he is. Speaking of swinging, that\'s what you\'ll do with this beautiful animal T-shirt!',
      price: '17.00',
      discounted_price: '15.99',
      thumbnail: 'colobus-thumbnail.gif',
      ProductCategory: {
        product_id: 40,
        category_id: 4,
      },
    },
    {
      product_id: 41,
      name: 'Canada Goose',
      description:
        'Being on a major flyway for these guys, we know all about these majestic birds. They hang out in large numbers on a lake near our house and fly over constantly. Remember what Frankie Lane said? "I want to go where the wild goose goes!" And when you go, wear this cool Canada goose animal T-shirt.',
      price: '15.99',
      discounted_price: '0.00',
      thumbnail: 'canada-goose-thumbnail.gif',
      ProductCategory: {
        product_id: 41,
        category_id: 4,
      },
    },
    {
      product_id: 42,
      name: 'Congo Rhino',
      description:
        "Among land mammals, this white rhino is surpassed in size only by the elephant. He has a big fan base too, working hard to make sure he sticks around. You'll be a fan of his, too, when people admire this unique and beautiful T-shirt on you!",
      price: '20.00',
      discounted_price: '18.99',
      thumbnail: 'congo-rhino-thumbnail.gif',
      ProductCategory: {
        product_id: 42,
        category_id: 4,
      },
    },
    {
      product_id: 43,
      name: 'Equatorial Rhino',
      description:
        "There's a lot going on in this frame! A black rhino is checking out that python slithering off into the bush--or is he eyeing you? You can bet all eyes will be on you when you wear this T-shirt!",
      price: '19.95',
      discounted_price: '17.95',
      thumbnail: 'equatorial-rhino-thumbnail.gif',
      ProductCategory: {
        product_id: 43,
        category_id: 4,
      },
    },
    {
      product_id: 44,
      name: 'Ethiopian Rhino',
      description:
        'Another white rhino is honored in this classic design that bespeaks the Africa of the early century. This pointillist and retro T-shirt will definitely turn heads!',
      price: '16.00',
      discounted_price: '0.00',
      thumbnail: 'ethiopian-rhino-thumbnail.gif',
      ProductCategory: {
        product_id: 44,
        category_id: 4,
      },
    },
    {
      product_id: 45,
      name: 'Dutch Sea Horse',
      description:
        'I think this T-shirt is destined to be one of our most popular simply because it is one of our most beautiful!',
      price: '12.50',
      discounted_price: '0.00',
      thumbnail: 'dutch-sea-horse-thumbnail.gif',
      ProductCategory: {
        product_id: 45,
        category_id: 4,
      },
    },
    {
      product_id: 46,
      name: 'Dutch Swans',
      description:
        'This stamp was designed in the middle of the Nazi occupation, as was the one above. Together they reflect a spirit of beauty that evil could not suppress. Both of these T-shirts will make it impossible to suppress your artistic soul, too!',
      price: '21.00',
      discounted_price: '18.99',
      thumbnail: 'dutch-swans-thumbnail.gif',
      ProductCategory: {
        product_id: 46,
        category_id: 4,
      },
    },
    {
      product_id: 47,
      name: 'Ethiopian Elephant',
      description:
        'From the same series as the Ethiopian Rhino and the Ostriches, this stylish elephant T-shirt will mark you as a connoisseur of good taste!',
      price: '18.99',
      discounted_price: '16.95',
      thumbnail: 'ethiopian-elephant-thumbnail.gif',
      ProductCategory: {
        product_id: 47,
        category_id: 4,
      },
    },
    {
      product_id: 48,
      name: 'Laotian Elephant',
      description:
        'This working guy is proud to have his own stamp, and now he has his own T-shirt!',
      price: '21.00',
      discounted_price: '18.99',
      thumbnail: 'laotian-elephant-thumbnail.gif',
      ProductCategory: {
        product_id: 48,
        category_id: 4,
      },
    },
    {
      product_id: 49,
      name: 'Liberian Elephant',
      description:
        'And yet another Jumbo! You need nothing but a big heart to wear this T-shirt (or a big sense of style)!',
      price: '22.00',
      discounted_price: '17.50',
      thumbnail: 'liberian-elephant-thumbnail.gif',
      ProductCategory: {
        product_id: 49,
        category_id: 4,
      },
    },
    {
      product_id: 50,
      name: 'Somali Ostriches',
      description:
        'Another in an old series of beautiful stamps from Ethiopia. These big birds pack quite a wallop, and so will you when you wear this uniquely retro T-shirt!',
      price: '12.95',
      discounted_price: '0.00',
      thumbnail: 'somali-ostriches-thumbnail.gif',
      ProductCategory: {
        product_id: 50,
        category_id: 4,
      },
    },
    {
      product_id: 51,
      name: 'Tankanyika Giraffe',
      description:
        'The photographer had to stand on a step ladder for this handsome portrait, but his efforts paid off with an angle we seldom see of this lofty creature. This beautiful retro T-shirt would make him proud!',
      price: '15.00',
      discounted_price: '12.99',
      thumbnail: 'tankanyika-giraffe-thumbnail.gif',
      ProductCategory: {
        product_id: 51,
        category_id: 4,
      },
    },
    {
      product_id: 52,
      name: 'Ifni Fish',
      description:
        "This beautiful stamp was issued to commemorate National Colonial Stamp Day (you can do that when you have a colony). When you wear this fancy fish T-shirt, your friends will think it's national T-shirt day!",
      price: '14.00',
      discounted_price: '0.00',
      thumbnail: 'ifni-fish-thumbnail.gif',
      ProductCategory: {
        product_id: 52,
        category_id: 4,
      },
    },
    {
      product_id: 53,
      name: 'Sea Gull',
      description:
        'A beautiful stamp from a small enclave in southern Morocco that belonged to Spain until 1969 makes a beautiful bird T-shirt.',
      price: '19.00',
      discounted_price: '16.95',
      thumbnail: 'sea-gull-thumbnail.gif',
      ProductCategory: {
        product_id: 53,
        category_id: 4,
      },
    },
    {
      product_id: 54,
      name: 'King Salmon',
      description:
        'You can fish them and eat them and now you can wear them with this classic animal T-shirt.',
      price: '17.95',
      discounted_price: '15.99',
      thumbnail: 'king-salmon-thumbnail.gif',
      ProductCategory: {
        product_id: 54,
        category_id: 4,
      },
    },
    {
      product_id: 55,
      name: 'Laos Bird',
      description:
        'This fellow is also known as the "White Crested Laughing Thrush." What\'s he laughing at? Why, at the joy of being on your T-shirt!',
      price: '12.00',
      discounted_price: '0.00',
      thumbnail: 'laos-bird-thumbnail.gif',
      ProductCategory: {
        product_id: 55,
        category_id: 4,
      },
    },
    {
      product_id: 56,
      name: 'Mozambique Lion',
      description:
        "The Portuguese were too busy to run this colony themselves so they gave the Mozambique Company a charter to do it. I think there must be some pretty curious history related to that (the charter only lasted for 50 years)! If you're a Leo, or know a Leo, you should seriously consider this T-shirt!",
      price: '15.99',
      discounted_price: '14.95',
      thumbnail: 'mozambique-lion-thumbnail.gif',
      ProductCategory: {
        product_id: 56,
        category_id: 4,
      },
    },
    {
      product_id: 57,
      name: 'Peru Llama',
      description:
        'This image is nearly 100 years old! Little did this little llama realize that he was going to be made immortal on the Web and on this very unique animal T-shirt (actually, little did he know at all)!',
      price: '21.50',
      discounted_price: '17.99',
      thumbnail: 'peru-llama-thumbnail.gif',
      ProductCategory: {
        product_id: 57,
        category_id: 4,
      },
    },
    {
      product_id: 58,
      name: 'Romania Alsatian',
      description:
        "If you know and love this breed, there's no reason in the world that you shouldn't buy this T-shirt right now!",
      price: '15.95',
      discounted_price: '0.00',
      thumbnail: 'romania-alsatian-thumbnail.gif',
      ProductCategory: {
        product_id: 58,
        category_id: 4,
      },
    },
    {
      product_id: 59,
      name: 'Somali Fish',
      description:
        "This is our most popular fish T-shirt, hands down. It's a beauty, and if you wear this T-shirt, you'll be letting the world know you're a fine catch!",
      price: '19.95',
      discounted_price: '16.95',
      thumbnail: 'somali-fish-thumbnail.gif',
      ProductCategory: {
        product_id: 59,
        category_id: 4,
      },
    },
    {
      product_id: 60,
      name: 'Trout',
      description:
        "This beautiful image will warm the heart of any fisherman! You must know one if you're not one yourself, so you must buy this T-shirt!",
      price: '14.00',
      discounted_price: '0.00',
      thumbnail: 'trout-thumbnail.gif',
      ProductCategory: {
        product_id: 60,
        category_id: 4,
      },
    },
    {
      product_id: 61,
      name: 'Baby Seal',
      description:
        'Ahhhhhh! This little harp seal would really prefer not to be your coat! But he would like to be your T-shirt!',
      price: '21.00',
      discounted_price: '18.99',
      thumbnail: 'baby-seal-thumbnail.gif',
      ProductCategory: {
        product_id: 61,
        category_id: 4,
      },
    },
    {
      product_id: 62,
      name: 'Musk Ox',
      description:
        "Some critters you just don't want to fool with, and if I were facing this fellow I'd politely give him the trail! That is, of course, unless I were wearing this T-shirt.",
      price: '15.50',
      discounted_price: '0.00',
      thumbnail: 'musk-ox-thumbnail.gif',
      ProductCategory: {
        product_id: 62,
        category_id: 4,
      },
    },
    {
      product_id: 63,
      name: 'Suvla Bay',
      description:
        ' In 1915, Newfoundland sent its Newfoundland Regiment to Suvla Bay in Gallipoli to fight the Turks. This classic image does them honor. Have you ever heard of them? Share the news with this great T-shirt!',
      price: '12.99',
      discounted_price: '0.00',
      thumbnail: 'suvla-bay-thumbnail.gif',
      ProductCategory: {
        product_id: 63,
        category_id: 4,
      },
    },
    {
      product_id: 64,
      name: 'Caribou',
      description:
        'There was a time when Newfoundland was a self-governing dominion of the British Empire, so it printed its own postage. The themes are as typically Canadian as can be, however, as shown by this "King of the Wilde" T-shirt!',
      price: '21.00',
      discounted_price: '19.95',
      thumbnail: 'caribou-thumbnail.gif',
      ProductCategory: {
        product_id: 64,
        category_id: 4,
      },
    },
    {
      product_id: 81,
      name: 'Holly Cat',
      description:
        'Few things make a cat happier at Christmas than a tree suddenly appearing in the house!',
      price: '15.99',
      discounted_price: '0.00',
      thumbnail: 'holly-cat-thumbnail.gif',
      ProductCategory: {
        product_id: 81,
        category_id: 4,
      },
    },
    {
      product_id: 97,
      name: 'Birds',
      description: 'Is your heart all aflutter? Show it with this T-shirt!',
      price: '21.00',
      discounted_price: '18.95',
      thumbnail: 'birds-thumbnail.gif',
      ProductCategory: {
        product_id: 97,
        category_id: 4,
      },
    },
    {
      product_id: 98,
      name: 'Kat Over New Moon',
      description: 'Love making you feel lighthearted?',
      price: '14.99',
      discounted_price: '0.00',
      thumbnail: 'kat-over-new-moon-thumbnail.gif',
      ProductCategory: {
        product_id: 98,
        category_id: 4,
      },
    },
  ],
};
