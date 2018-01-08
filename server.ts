import * as sio from 'socket.io';
import * as http from "http";

let httpServer = http.createServer();
const port = 8000;
httpServer.listen(port);
console.log('Socket server listening on port ', port);

// plus vite : sio(httpServer, { transports: [ "websocket" ] })
let sioServer = sio(httpServer);

sioServer.on('connection', (socketClient: any) => {
    socketClient.on('subscribeToApp', (pseudo: any) => {
        console.log(pseudo + ' is subscribing to app !');
        socketClient.emit('welcome', {
            connected: true,
            welcomeMessage: 'Welcome ' + pseudo + ' !'
        });
    });
});