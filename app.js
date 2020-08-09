//var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
/*
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});
*/

const express = require('express')
const app = express()
const port = 8080

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (req, res) => {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
})

app.post('/sentence', (req, res) => {
    console.log(req.body.sentence);
    io.sockets.emit("sentence", req.body.sentence )
    res.writeHead(200, {});
    res.end();
})

var server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    //socket.emit('sentence', 'test yop')
});


//server.listen(8080);
