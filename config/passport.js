const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const constants = require('../constants.js');
const LocalStrategy = require('passport-local').Strategy;
const fetch = require("node-fetch");

//Deserializators
passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
    
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });

  //Strategy Config Google Auth
passport.use(new GoogleStrategy({
    clientID: constants.CLIENT_ID,
    clientSecret: constants.CLIENT_SECRET,
    callbackURL: constants.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null,profile);
  }
));

//Local Strategy, connect to login server
passport.use(new LocalStrategy(
  {usernameField: 'email',
  passwordField: 'password'},
   async function(userid, password, next) {
    var date = JSON.stringify({
      "username": userid,
      "password": password
    });

    let userData = await requestLogin(date);
      return next(null, userData);
}));

//Async function, send username and password to Login server an recibe a user
async function requestLogin(infouser) {
  let response = await fetch(constants.URL_LOGIN_GROC,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: infouser,
    })
    
  let data = await response
  if(data.status===200){
    return await data.json();
  }else{
    return false;
  }
}