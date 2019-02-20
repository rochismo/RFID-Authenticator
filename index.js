var express = require('express');
var app = express();

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const serialWindowsPort = "COM3";
const moment = require('moment');
var idMachine = '192.168.1.1';

const port = new SerialPort(serialWindowsPort, {
    baudRate: 9600
});

const parser = port.pipe(new Readline({ delimiter: '\n' }));
const verify = require('./verify');


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    verify.verifyRFID({machineId: "1"})
});


// Reading the port data:
port.on("open", () => {
  console.log('Serial Port Opening');
});

// read the data of the rfid:
parser.on('data', rfid => {

  rfid = rfid.trim();

  var date = moment().format("DD-MM-YYYY");
  var hour = moment().format("HH:mm:ss");

<<<<<<< Updated upstream
  var responseObj = new Response (rfid, date, hour, idMachine)
=======
  var responseObj = new Response (rfid, date , idMachine)


  console.log(responseObj);
>>>>>>> Stashed changes

  console.log(JSON.stringify(responseObj));

});

// Response Object
function Response (rfid, date, hour, idMachine) {
    this.rfid = rfid;
    this.date = date;
    this.hour = hour;
    this.idMachine = idMachine;
}




//Verify mock
app.get('/verify', function (req, res) {
    if(req.query.machineId == 1){
        res.send("verificado")
    } else {
        res.send("no estas verificado")
    }
});