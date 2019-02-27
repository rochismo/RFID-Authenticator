// Connection with database./constants.js/index.js
const pathConection = 'mongodb://localhost:27017/signin';

// Connection with nfc arduino port
// In Linux the port would look similar to this --> '/dev/ttyACM0'
const nfcPort = 'COM3';

// Connection with lcd arduino port
// In Linux the port would look similar to this --> '/dev/ttyACM0'
const lcdPort = 'COM4';

// Raspberry identifier
const idMachine = '192.168.1.1';

// Url of the Verification Server
const urlVerificationServer = "http://localhost:3000/verify";

exports.pathConection = pathConection;
exports.nfcPort = nfcPort;
exports.lcdPort = lcdPort;
exports.idMachine = idMachine;
exports.urlVerificationServer = urlVerificationServer;