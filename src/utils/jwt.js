import * as JWT from 'jsonwebtoken';
import expressJwt from 'express-jwt';
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
