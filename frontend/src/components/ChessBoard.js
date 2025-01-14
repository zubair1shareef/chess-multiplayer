
import { useState } from "react";
import { MOVE } from "../screens/Game";


export const ChessBoard = ({ chess, board, socket, setBoard }) => {
    const [from, setFrom] = useState(null);
    const currnetplayer = sessionStorage.getItem('color')

    return <div className="text-white-200">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    const squareRepresentation = String.fromCharCode(97 + (j % 8)) + "" + (8 - i)

                    return <div onClick={() => {
                        try {
                            if (!from) {
                                setFrom(squareRepresentation);
                            } else {
                                socket.send(JSON.stringify({
                                    type: MOVE,
                                    payload: {
                                        move: {
                                            from,
                                            to: squareRepresentation
                                        }
                                    }
                                }))

                                setFrom(null)
                                chess.move({
                                    from,
                                    to: squareRepresentation
                                });
                                setBoard(chess.board());
                                console.log({
                                    from,
                                    to: squareRepresentation
                                })
                            }
                        } catch (error) {
                            console.log(error)
                        }
                        // ${currnetplayer==square?.color?'cursor-pointer':'cursor-not-allowed'}
                    }} key={j} className={`w-16 h-16 cursor-not-allowed ${currnetplayer==square?.color?'cursor-pointer':'cursor-not-allowed'} ${(i + j) % 2 === 0 ? 'bg-green-500' : 'bg-slate-500'}`}> 
                        <div className="w-full justify-center flex h-full">
                            <div className="h-full justify-center flex flex-col">
                                {/* {square?.type} */}
                                {square ? <img className="w-4" src={`/${square?.color === "b" ? square?.type : `${square?.type?.toUpperCase()} copy`}.png`} /> : null}
                            </div>
                        </div>
                    </div>
                })}
            </div>
        })}
    </div>
}