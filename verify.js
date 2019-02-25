//Send http request to verify signin
const axios = require('axios');
const verificationServer = require('./constants');


module.exports.verifyRFID = async function (rfid) {

    return axios.get(verificationServer.urlVerificationServer, {
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