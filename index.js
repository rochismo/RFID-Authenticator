const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const serialWindowsPort = "COM3";
const moment = require('moment');
var idMachine = '192.168.1.1';

const port = new SerialPort(serialWindowsPort, { 
    baudRate: 9600 
});


const parser = port.pipe(new Readline({ delimiter: '\n' }));


// Reading the port data:
port.on("open", () => {
  console.log('Serial Port Opening');
});

// read the data of the rfid:
parser.on('data', rfid => {

  rfid = rfid.trim();

  var date = moment().format("DD-MM-YYYY");
  var hour = moment().format("HH:mm:ss");

  var responseObj = new Response (rfid, date, hour, idMachine)

  console.log(JSON.stringify(responseObj));

});

// Response Object
function Response (rfid, date, hour, idMachine) {
    this.rfid = rfid;
    this.date = date;
    this.hour = hour;
    this.idMachine = idMachine;
}
