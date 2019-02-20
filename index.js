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

  var date = moment().format("DD-MM-YYYY:HH:mm:ss");

  var responseObj = new Response (rfid, date , idMachine)

  console.log(responseObj);

  console.log(JSON.stringify(responseObj));

});

function Response (rfid, date, idMachine) {
    this.rfid = rfid;
    this.date = date;
    this.idMachine = idMachine;
}
