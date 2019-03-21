const {pathConnection} = require('./constants.js');
const mongoose = require('mongoose');
require('colors');

mongoose.connect(pathConection, {useNewUrlParser: true});

const Signing = mongoose.model('Signin', {
    idMachine: String,
    rfid: String,
    date: String,
    hour: String
});

module.exports.saveSignin = function (Signin) {
    console.log("[database] Saving signin" .green);
    let signin = new Signing();
    signin.idMachine = Signin.idMachine;
    signin.rfid = Signin.rfid;
    signin.date = Signin.date;
    signin.hour = Signin.hour;
    signin.save().then(_ => console.log("[database] Signin saved!" .green));
}

