import passport from 'passport';
import FacebookTokenStrategy from 'passport-facebook-token';
import dotenv from 'dotenv';
import db from '../database/models';
import { Actions } from './db-actions';

dotenv.config();

passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: process.env.facebookClientID,
      clientSecret: process.env.facebookClientSecret,
    },
    // eslint-disable-next-line consistent-return
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await db.Customer.findOne({
          where: {
            facebook_id: profile.id,
          },
        });
        if (existingUser) {
          return done(null, existingUser);
        }

        const { id, name } = profile;

        const signupData = {
          facebook_id: id,
          name: name.familyName,
          password: 'facebookUser',
        };

        const newUser = await Actions.addData(db.Customer, signupData, [
          'facebook_id',
          'name',
          'password',
        ]);
        return done(null, newUser);
      } catch (e) {
        done(e, false, e.message);
      }
    }
  )
);
