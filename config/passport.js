const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, URL_LOGIN_GROC} = require('../constants.js');
const LocalStrategy = require('passport-local').Strategy;
const fetch = require("node-fetch");

//Deserializators
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

//Strategy Config Google Auth
passport.use(new GoogleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));

//Local Strategy, connect to login server
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function (userid, password, next) {
    const data = JSON.stringify({
      "username": userid,
      "password": password
    });

    let userData = await requestLogin(data);
    return next(null, userData);
  }));

//Async function, send username and password to Login server an recibe a user
async function requestLogin(infouser) {
  let response = await fetch(URL_LOGIN_GROC, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: infouser,
  })

  return response.status === 200 ? await response.json() : false;

}