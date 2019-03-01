const app = require('express')();

app.listen(3000, function () {
    console.log('[mock] Mock App listening on port 3000!' .cyan);
});

// Verify mock
app.get('/verify', function (req, res) {
    
    if (req.query.rfid == '00 34 8E A3') {
        res.send('1')
    } else if(req.query.rfid == '3A 69 92 B9') {
        res.send('2')
    } else {
        res.send('0')
    }
});