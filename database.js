const configuration = require('./configuration.js');
const mongoose = require('mongoose', {useNewUrlParser: true});

mongoose.connect(configuration.pathConection);

const Signing = mongoose.model('Signin', {
    idMachine: String,
    rfid: String,
    date: String,
    hour: String
});

module.exports.saveDatabase = function (Signin) {
    console.log("Saving signin");
    let signin = new Signing()
    signin.idMachine = Signin.idMachine;
    signin.rfid = Signin.rfid;
    signin.date = Signin.date;
    signin.hour = Signin.hour;
    signin.save().then(_ => console.log("Signin saved!"));
}

