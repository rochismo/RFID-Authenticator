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