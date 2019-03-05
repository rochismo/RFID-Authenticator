const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const constants = require('../constants.js');

//Deserializators
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
    
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  //Strategy Config
passport.use(new GoogleStrategy({
    clientID: constants.CLIENT_ID,
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: constants.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null,profile);
  }
));