var express = require('express');
var app = express();

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const savedata = require('./database.js');
const verify = require('./verify');
const configuration = require('./configuration.js');

const moment = require('moment');
const idMachine = configuration.idMachine;

const portNfc = new SerialPort(configuration.nfcPort, {
    baudRate: 9600
});

const parserNfc = portNfc.pipe(new Readline({
    delimiter: '\n'
}));

const portLcd = new SerialPort(configuration.lcdPort, {
    baudRate: 9600
});


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
portNfc.on("open", () => {
    console.log('Serial Port NFC Opening');
});

portLcd.on("open", () => {
    console.log('Serial Port LCD Opening');
});

// Read the data of the rfid:
parserNfc.on('data', async function (rfid) {

    rfid = rfid.trim();

    var date = moment().format("DD-MM-YYYY");
    var hour = moment().format("HH:mm:ss");

    var responseObj = new Response(rfid, date, hour, idMachine);

    savedata.saveDatabase(responseObj);

    let isVerified = await verify.verifyRFID(responseObj);

    sendToArduino(isVerified);
    
    console.log(JSON.stringify(responseObj));

    portLcd.write(rfid);

});

function sendToArduino(isVerified) {
    if (isVerified == true) {
        portNfc.write('1');
    } else {
        portNfc.write('0');
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