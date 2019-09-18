import * as JWT from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import db from '../database/models';
// eslint-disable-next-line import/prefer-default-export
export const signToken = userId => {
  const iat = new Date().getTime();
  const exp = new Date().setDate(new Date().getDate() + 1);
  const token = JWT.sign(
    {
      iss: process.env.JWT_ISSUER,
      sub: userId,
      iat,
      exp,
    },
    process.env.JWT_KEY
  );
  return { token, exp, iat };
};

export const requireSignIn = expressJwt({
  secret: process.env.JWT_KEY,
  issuer: process.env.JWT_ISSUER,
  requestProperty: 'auth',
});

/**
 * function to check user authorization status
 */
export const hasAuthorization = async (req, res, next) => {
  const customer = await db.Customer.findOne({
    where: {
      customer_id: req.auth.sub,
    },
  });
  if (!customer) {
    return res.status(403).send({
      error: 'User is not authorised',
    });
  }
  delete customer.dataValues.password;
  req.customer = customer.dataValues;
  next();
};
