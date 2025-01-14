"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameManager = void 0;
const Game_1 = require("./Game");
const message_1 = require("./message");
class GameManager {
    constructor() {
        this.games = [];
        this.penndingUser = null;
        this.users = [];
    }
    addUser(socket) {
        var _a;
        (_a = this.users) === null || _a === void 0 ? void 0 : _a.push(socket);
        this.addHandler(socket);
    }
    removeUser(socket) {
        var _a;
        this.users = (_a = this.users) === null || _a === void 0 ? void 0 : _a.filter(user => user != socket);
    }
    addHandler(socket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type == message_1.INIT_GAME) {
                if (this.penndingUser) {
                    const game = new Game_1.Game(this.penndingUser, socket);
                    this.games.push(game);
                    this.penndingUser = null;
                }
                else {
                    this.penndingUser = socket;
                }
                // this.joinGame(socket)
            }
            if (message.type == message_1.MOVE) {
                const game = this.games.find(game => game.player1 == socket || game.player2 == socket);
                if (game) {
                    console.log(message.payload.move);
                    game.makeMove(socket, message.payload.move);
                }
            }
        });
    }
}
exports.GameManager = GameManager;
