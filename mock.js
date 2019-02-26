var express = require('express');
var app = express();

app.listen(3000, function () {
    console.log('[mock] Mock App listening on port 3000!' .cyan);
});

// Verify mock
app.get('/verify', function (req, res) {
    
    if (req.query.rfid == 'E0 EE 99 A3' || req.query.rfid == '00 34 8E A3') {
        res.send('true')
    } else {
        res.send('false')
    }
});