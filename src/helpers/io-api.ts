import * as io from 'socket.io-client';
import Socket = SocketIOClient.Socket;

const socket = io.connect('http://localhost:8000');

function getSocket(): Socket {
    return socket;
}

function subscribeToApp(cb: (err: string) => void, pseudo: string) {
    socket.on('newPlayer', () => cb(''));
    socket.emit('subscribeToApp', pseudo);
}

export {
    subscribeToApp,
    getSocket
};