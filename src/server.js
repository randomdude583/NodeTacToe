const express = require('express');
var cors = require('cors');


const path = require('path');
const services = require('./services');

let app = express();
app.use(cors());
app.options('*', cors());



app.get('/', function(req, res) {
    services.game.initGame();
    res.sendFile(path.join(__dirname + '/assets/game.html'));
});

app.post('/move/:position/', async (req, res) => {
    const { position } = req.params;

    const response = services.game.move(position);

    res.send(JSON.stringify(response));
});

app.post('/reset/', async (req, res) => {
    const response = services.game.initGame();
    res.send(JSON.stringify(response));
});
 
app.use("/scripts", express.static(path.join(__dirname, 'assets/scripts')));

app.listen(3000);






