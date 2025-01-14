import { WebSocket } from "ws"
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./message"

export class Game {
    public player1: WebSocket
    public player2: WebSocket
    private board: Chess
    private moves: number = 0

    private startTime: Date
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1
        this.player2 = player2
        this.board = new Chess()
        this.startTime = new Date()
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload: {
                color: "black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
        if (this.moves % 2 == 0 && socket != this.player1) {
            console.log('shit1')
            return
        }
        if (this.moves % 2 == 1 && socket != this.player2) {
            console.log('shit2')
            return
        }
        //validation
        try {
            this.board.move(move)
        } catch (error) {
            console.log(error)
        }
        //chcekc if game is over
        if (this.board.isGameOver()) {
            this.player1.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? 'black' : 'white'
                }
            }))
            this.player2.send(JSON.stringify({
                type: GAME_OVER,
                payload: {
                    winner: this.board.turn() == "w" ? 'black' : 'white'
                }
            }))
            return;
        }
        if (this.moves % 2 == 0) {
            this.player2.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))
        } else {

            this.player1.send(JSON.stringify({
                type: MOVE,
                payload: move
            }))

        }
        this.moves++

    }

}