import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:8000');

function subscribeToApp(cb: (err: string, connected: boolean, welcomeMessage: string) => void, pseudo: string) {
    socket.on('welcome', (result: { connected: boolean, welcomeMessage: string }) => {
        cb('', result.connected, result.welcomeMessage);
    });
    socket.emit('subscribeToApp', pseudo);
}

export {subscribeToApp};