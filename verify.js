//Send http request to verify signin
const axios = require('axios');
const verificationServer = "http://localhost:3000/verify";


module.exports.verifyRFID = function verifyRFID(rfid) {
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
