"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws) {
    gameManager.addUser(ws);
    console.log('user connected ', ws);
    ws.on('error', console.error);
    ws.on('disconnect', function message(data) {
        gameManager.removeUser(ws);
    });
    // ws.send('something');
});
