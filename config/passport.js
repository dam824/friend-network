const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const config = require('../config/database');

//passwport = authenticate user using differents stratégies

module.exports = function(passport) {
  
  let opts = {};
  //etrait le JWT de l'authorization ' header de la requete avec le BEARER pour utiliser le JWT
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
//clef secrete pour vérifier le JWT
  opts.secretOrKey = config.secret;

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
 
    User.getUserById(jwt_payload.data._id, (err, user) => {
   
      if(err) {
        return done(null, false, { message: "bad username or passwords don't match" });
      }

      if(user) {
        return done(null, user);
      } else {
        return done(null, false, { message: "bad username or passwords don't match" });
        // return done(null, false);
      }
    });
  }));
}