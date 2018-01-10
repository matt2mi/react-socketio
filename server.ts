import * as sio from 'socket.io';
import * as http from 'http';
import Socket = SocketIOClient.Socket;

let httpServer = http.createServer();
const port = 8000;
httpServer.listen(port);
console.warn('Socket server listening on port ', port);

// TODO : plus vite - sio(httpServer, { transports: [ 'websocket' ] }) ??
let sioServer = sio(httpServer);

const players: string[] = [];

sioServer.on('connection', (socketClient: Socket) => {
    socketClient.on('subscribeToApp', (pseudo: string) => {
        console.warn(pseudo + ' is subscribing to app !');
        players.push(pseudo);

        sioServer.emit('newPlayer', {pseudo});
    });
});

// module dependencies
const server = require('./api/api');
const debug = require('debug')('express:server');

// create http server
const httpPort = normalizePort(process.env.PORT || '8080');
const app = server.Server.bootstrap(__dirname + '/build/index.html').app;
app.set('port', httpPort);
httpServer = http.createServer(app);

// listen on provided ports
httpServer.listen(httpPort);

// add error handler
httpServer.on('error', onError);

// start listening on port
httpServer.on('listening', onListening);

// Normalize a port into a number, string, or false.
function normalizePort(val: string) {
    const portNormalized = parseInt(val, 10);

    if (isNaN(portNormalized)) {
        //  named pipe
        return val;
    }

    if (portNormalized >= 0) {
        //  port number
        return portNormalized;
    }

    return false;
}

// Event listener for HTTP server 'error' event.
function onError(error: { code: string, syscall: string }) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof httpPort === 'string'
        ? 'Pipe ' + httpPort
        : 'Port ' + httpPort;

    //  handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.warn(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.warn(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

// Event listener for HTTP server 'listening' event.
function onListening() {
    const addr = httpServer.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}