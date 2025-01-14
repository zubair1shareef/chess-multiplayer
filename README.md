### Game Class Documentation

The `Game` class manages a chess game between two players over WebSocket connections. It uses the `chess.js` library for game logic.

#### Properties:
- `player1` (`WebSocket`): WebSocket connection for Player 1.
- `player2` (`WebSocket`): WebSocket connection for Player 2.
- `board` (`Chess`): Instance of the chess board.
- `moves` (`number`): Tracks the number of moves made.
- `startTime` (`Date`): Timestamp for when the game started.

#### Constructor:
`constructor(player1: WebSocket, player2: WebSocket)`
- Initializes the chessboard, sets players, and sends initial game state to both players.

#### Methods:
- `makeMove(socket: WebSocket, move: { from: string, to: string }): void`
  - Validates the move based on the player's turn.
  - Updates the chessboard.
  - Checks for game over and notifies players.
  - Sends the move to the opponent. 

#### Communication Types:
- `INIT_GAME`: Sent to initialize the game with player colors (`white`/`black`).
- `MOVE`: Sent to notify the opponent of a move.
- `GAME_OVER`: Sent to declare the winner when the game ends.





<img width="1080" alt="Screenshot 2025-01-14 at 12 44 07 PM" src="https://github.com/user-attachments/assets/c1ec038e-510d-43f3-9a4b-88c193e81a85" />
