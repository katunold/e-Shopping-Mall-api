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
