const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwtOptions = require('./jwtOptions');

const User = require('../models/User');

const { Strategy, ExtractJwt } = passportJWT;

const strategy = new Strategy(jwtOptions, (payload, done) => {
  User.findById(payload.id)
    .then(user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    })
    .catch(err => done(err, false));
});

passport.use(strategy);

module.exports = passport;
