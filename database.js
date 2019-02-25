const constants = require('./constants.js');
const mongoose = require('mongoose');
require('colors');

mongoose.connect(constants.pathConection, {useNewUrlParser: true});

const Signing = mongoose.model('Signin', {
    idMachine: String,
    rfid: String,
    date: String,
    hour: String
});

module.exports.saveDatabase = function (Signin) {
    console.log("[database] Saving signin" .cyan);
    let signin = new Signing()
    signin.idMachine = Signin.idMachine;
    signin.rfid = Signin.rfid;
    signin.date = Signin.date;
    signin.hour = Signin.hour;
    signin.save().then(_ => console.log("[database] Signin saved!" .cayn));
}

