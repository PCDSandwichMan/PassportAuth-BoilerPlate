const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../models/User');

module.export = function(passport) {
  let opt = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  opts.secretOrKey = config.JWT_KEY;
  passport.use(
    new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({ id: jwt_payload.id })
        .then(userData => {
          if (!userData) {
            return done(null, false, { error: 'user not found' });
          }
          done(null, user);
        })
        .catch(err => {
          console.log(err);
          done(err, false);
        });
    })
  );
};
