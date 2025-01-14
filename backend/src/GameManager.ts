import { Game } from "./Game"
import { INIT_GAME, MOVE } from "./message"
import { WebSocket } from "ws"

export class GameManager {
    private games: Game[]
    private penndingUser: WebSocket | null
    private users: WebSocket[]
    constructor() {
        this.games = []
        this.penndingUser = null
        this.users = []
    }
    addUser(socket: WebSocket) {
        this.users?.push(socket)
        this.addHandler(socket)

    }
    removeUser(socket: WebSocket) {
        this.users = this.users?.filter(user => user != socket)
    }
    private addHandler(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString())
            if (message.type == INIT_GAME) {
                if (this.penndingUser) {
                    const game = new Game(this.penndingUser, socket)
                    this.games.push(game)
                    this.penndingUser = null
                } else {
                    this.penndingUser = socket
                }
                // this.joinGame(socket)
            }
            if (message.type == MOVE) {
                const game = this.games.find(game => game.player1 == socket || game.player2 == socket)
                if (game) {
                    console.log( message.payload.move)
                    game.makeMove(socket, message.payload.move)
                }
            }
        })

    }
}