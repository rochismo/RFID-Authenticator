const express = require('express');
const passport = require('passport');
const constants = require('../constants.js');
const jwt = require('jsonwebtoken');
const path = express.Router();

function handleToken(err, decoded) {
  if (err) {
    return res.json({
      success: false,
      message: 'Failed to authenticate token.'
    });
  }
  // if everything is good return this json
  return res.json({
    success: true,
    message: 'Is verified.'
  });

}

//End Point with verify Logic
path.post('/verify', function (req, res) {
  if (!req.headers.authorization) {
    // There is no auth code
    res.statusCode(401).send(401);
    return;
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    // No token found
    res.statusCode(400).send(400);
    return;
  }

  // Verify token
  jwt.verify(token, constants.SECRET_JWT, handleToken);

});

//End Point with Google Auth
path.get('/google',
  passport.authenticate('google', {
    scope: ['profile']
  }));

path.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: "/auth/google",

  }),
  function (req, res) {
    let token = jwt.sign({
      profile: req.user,
    }, constants.SECRET_JWT, {
      expiresIn: constants.TOKEN_EXPIRE
    })
    // Successful authentication, send Token.
    res.json({
      token: token
    });
  });

path.post('/local', passport.authenticate('local', {
  session: false
}), function (req, res) {
  if (!req.user) {
    return res.json({
      success: false,
      message: 'Failed to authenticate token.'
    });
  }
  
  const token = jwt.sign({
    profile: req.user
  }, constants.SECRET_JWT, {
    expiresIn: constants.TOKEN_EXPIRE
  })

  //res.locals.token=token;
  res.json({
    token: token
  });

});

module.exports = path;