const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const constants = require('./constants.js');
const jwt = require('jsonwebtoken');


//Deserializators
passport.serializeUser(function(user, cb) {
  cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

//Strategy Config
passport.use(new GoogleStrategy({
    clientID: constants.clientID,
    clientSecret: constants.clientSecret,
    callbackURL: constants.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null,profile);
  }
));


app.use(passport.initialize());

//End Point with verify Logic
app.post('/auth/verify', function (req, res) {

  let token = req.headers.authorization.split(" ")[1];
  if (token) {
    try {
      jwt.verify(token, constants.SECRET_JWT, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
              // if everything is good, save to request for use in other routes
              return res.json({ success: true, message: 'Is verified.' });  
            }
          });
        } catch (err) {
        console.log(err);
        res.send(400);
        //return next();
      }
    } else {
      console.log("no token");
      //next();
      res.send(400);
    }
  });

//End Point with Google Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google',{
    failureRedirect: "/auth/google",
    
    }),
  function(req, res) {
    // Successful authentication, send Token.

    let token = jwt.sign({
      profile: req.user,
  }, constants.SECRET_JWT, { expiresIn: constants.TOKEN_EXPIRE })

    res.json({ token: token });
  });

app.listen(constants.PORTSERVER, function () {
  console.log('Example app listening on port:'+constants.PORTSERVER);
});