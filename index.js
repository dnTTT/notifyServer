const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

const config = require('./config');


var options = {
key: fs.readFileSync('mydomain.key'),
cert: fs.readFileSync( 'mydomain.crt' )
};

var cors = require('cors');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", 'https://www.magno.pt');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

const secureServer = https.createServer(options,app).listen(config.portHTTPS);

const io = require('socket.io')(secureServer);


io.on('connection',function(socket){  
    console.log("A user is connected");
    socket.on('add reserva',function(status){
        io.sockets.emit('update reserva', "Tem uma nova reserva");
    });
    socket.on('add encomenda',function(status){
        io.sockets.emit('update encomenda', "Tem uma nova encomenda");
    });
    
    socket.on('disconnect', function () {
      console.log('A user disconnected');
   });
});

