
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const database = require('./database.js');
const verify = require('./verify');
const constants = require('./constants.js');
const moment = require('moment');
require('colors');
require('./mock.js');
require('./authServer.js');

let insertMode = false;

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
    console.log(responseObj);
    let isVerified = await verify.verifyRFID(responseObj);
   
    sendToArduino(isVerified,rfid);
    
    console.log(JSON.stringify(responseObj));

});

function sendToArduino(isVerified,rfid) {

    if (insertMode && isVerified != 2) {
        portNfc.write('1');
        portLcd.write(rfid+"-Mode insercio");

    } else if (!insertMode && isVerified == 2) {
        insertMode = true;
        portNfc.write('2');
        portLcd.write(rfid+"-Mode insercio");

    } else if (insertMode && isVerified == 2) {
        insertMode = false;
        portNfc.write('2');
        portLcd.write("Fi Mode insercio");
 
    } else {
        if (isVerified == 1) {
            portNfc.write('1');
        } else {
            portNfc.write('0');
        }
        portLcd.write(rfid);

    }
    console.log('[serialport] Sending info out of the serial port' .cyan);
}
