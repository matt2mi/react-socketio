"use strict";
exports.__esModule = true;
var sio = require("socket.io");
var http = require("http");
var httpServer = http.createServer();
var port = 8000;
httpServer.listen(port);
console.log('Socket server listening on port ', port);
// plus vite : sio(httpServer, { transports: [ "websocket" ] })
var sioServer = sio(httpServer);
sioServer.on('connection', function (socketClient) {
    socketClient.on('subscribeToApp', function (pseudo) {
        console.log(pseudo + ' is subscribing to app !');
        socketClient.emit('welcome', {
            connected: true,
            welcomeMessage: 'Welcome ' + pseudo + ' !'
        });
    });
});
