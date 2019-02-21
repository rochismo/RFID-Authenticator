var express = require('express');
var app = express();

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const savedata = require('./database.js');
const verify = require('./verify');
const configuration = require('./configuration.js');

const moment = require('moment');
var idMachine = configuration.idMachine;

const port = new SerialPort(configuration.nfcPort, {
    baudRate: 9600
});

const parser = port.pipe(new Readline({
    delimiter: '\n'
}));



app.listen(3000, function () {
    console.log('Example App listening on port 3000!');
});

// Response Object
function Response(rfid, date, hour, idMachine) {
    this.rfid = rfid;
    this.date = date;
    this.hour = hour;
    this.idMachine = idMachine;
}

// Reading the port data:
port.on("open", () => {
    console.log('Serial Port Opening');
});

// Read the data of the rfid:
parser.on('data', async function (rfid) {

    rfid = rfid.trim();

    var date = moment().format("DD-MM-YYYY");
    var hour = moment().format("HH:mm:ss");

    var responseObj = new Response(rfid, date, hour, idMachine);
    console.log(responseObj);

    savedata.saveDatabase(responseObj);

    let isVerified = await verify.verifyRFID(responseObj);

    sendToArduino(isVerified);
    
    console.log(JSON.stringify(responseObj));

});

function sendToArduino(isVerified) {
    if (isVerified == true) {
        port.write('1');
    } else {
        port.write('0');
    }
    console.log('Sending info out of the serial port');
}


//Verify mock
app.get('/verify', function (req, res) {
    if (req.query.rfid == 'E0 EE 99 A3') {
        res.send('true')
    } else {
        res.send('false')
    }
});