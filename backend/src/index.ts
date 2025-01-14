import { WebSocketServer } from 'ws';
import { GameManager } from './GameManager';

const wss = new WebSocketServer({ port: 8080 });

const gameManager = new GameManager()

wss.on('connection', function connection(ws) {
    gameManager.addUser(ws)
    console.log('user connected ',ws)
    ws.on('error', console.error);

    ws.on('disconnect', function message(data) {
        gameManager.removeUser(ws)
    });

    // ws.send('something');
});