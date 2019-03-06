const express = require('express');
const app = express();
const passport = require('passport');
const constants = require('./constants.js');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
//Paspport Config
require('./config/passport.js');

app.use(bodyParser.urlencoded({ extended: false }))

//Start passport
app.use(passport.initialize());
//Configure  all entdpoints in routes.js for works in /auth/... 
app.use('/auth',routes);


app.listen(constants.PORTSERVER, function () {
  console.log('AuthServer listening on port:'+constants.PORTSERVER);
});