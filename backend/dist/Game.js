"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
const message_1 = require("./message");
class Game {
    constructor(player1, player2) {
        this.moves = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.board = new chess_js_1.Chess();
        this.startTime = new Date();
        this.player1.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "white"
            }
        }));
        this.player2.send(JSON.stringify({
            type: message_1.INIT_GAME,
            payload: {
                color: "black"
            }
        }));
    }
    makeMove(socket, move) {
        if (this.moves % 2 == 0 && socket != this.player1) {
            console.log('shit1');
            return;
        }
        if (this.moves % 2 == 1 && socket != this.player2) {
            console.log('shit2');
            return;
        }
        //validation
        try {
            this.board.move(move);
        }
        catch (error) {
            console.log(error);
        }
        //chcekc if game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? 'black' : 'white'
                }
            }));
            this.player2.send(JSON.stringify({
                type: message_1.GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? 'black' : 'white'
                }
            }));
            return;
        }
        if (this.moves % 2 == 0) {
            this.player2.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        else {
            this.player1.send(JSON.stringify({
                type: message_1.MOVE,
                payload: move
            }));
        }
        this.moves++;
    }
}
exports.Game = Game;
