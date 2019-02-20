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

const express = require('express');
const app = express();
const axios = require('axios');


const verificationServer = "http://localhost:3000/verify";


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


//Verify mock
app.get('/verify', function (req, res) {
    if(req.query.machineId == 1){
        res.send("verificado")
    } else {
        res.send("no estas verificado")
    }
});



//Send http request to verify signin
function verifyRFID(rfid) {
    axios.get(verificationServer, {
        params: rfid
    })
        .then(response => {
            console.log(response.data);
            return response.data
        })
        .catch(error => {
            console.log(error);
        });
}