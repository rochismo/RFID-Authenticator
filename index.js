
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const database = require('./database.js');
const verify = require('./verify');
const constants = require('./constants.js');
const moment = require('moment');
require('colors');
require('./mock.js');


const idMachine = constants.idMachine;

const portNfc = new SerialPort(constants.nfcPort, {
    baudRate: 9600
});

const parserNfc = portNfc.pipe(new Readline({
    delimiter: '\n'
}));


const portLcd = new SerialPort(constants.lcdPort, {
    baudRate: 9600
});

// Response Object
function Response(rfid, date, hour, weekDay, idMachine) {
    this.rfid = rfid;
    this.date = date;
    this.hour = hour;
    this.weekDay = weekDay;
    this.idMachine = idMachine;
}

// Reading the port data:
portNfc.on('open', () => {
    console.log('[serialport] Serial Port NFC Opening' .cyan);
});

portLcd.on('open', () => {
    console.log('[serialport] Serial Port LCD Opening' .cyan);
});

// Read the data of the rfid:
parserNfc.on('data', async function (rfid) {

    rfid = rfid.trim();

    let date = moment().format("YYYY-DD-MM");
    let hour = moment().format("HH:mm:ss");
    let weekDay = moment().format("dddd");

    let responseObj = new Response(rfid, date, hour, weekDay, idMachine);

    database.saveSignin(responseObj);

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
    console.log('[serialport] Sending info out of the serial port' .cyan);
}
