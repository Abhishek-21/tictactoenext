"use client"

import { useEffect, useState } from "react";
import Square from "./Square";
import styles from './css/board.module.css';

const PLAYERSYMBOL = ['X', 'O'];
const WINCRITERIA = ['012', '345', '678', '036', '147', '258', '048', '246'];

function Board(props: any) {
    const [currentPlayer, setCurrentPlayer] = useState(PLAYERSYMBOL[0]);
    const [winner, setWinner] = useState<string | null>(null);
    const [square, setSquare] = useState(Array.from(new Array(9)));

    useEffect(() => {
        let playerX = getAreaClickedByPlayer(square, PLAYERSYMBOL[0]);
        let playerY = getAreaClickedByPlayer(square, PLAYERSYMBOL[1]);
        let hasWinner = checkWinOrDraw(playerX, playerY);
        if (hasWinner?.won) {
            setWinner(hasWinner.won);
        } else if (hasWinner?.draw) {
            setWinner("DRAW");
        }
    }, [square]);

    const getAreaClickedByPlayer = (square: any, playerToCheck: any) => {
        return square.map((val: any, index: any) => (val === playerToCheck) ? index : null).filter((ele: any) => ele !== null);
    }

    const checkWinOrDraw = (playerX: any, playerY: any) => {
        let XWon = WINCRITERIA.some(winCon => winCon.split("").every(ele => playerX.join("").includes(ele)));
        let YWon = WINCRITERIA.some(winCon => winCon.split("").every(ele => playerY.join("").includes(ele)));
        if (XWon || YWon) {
            return { won: XWon ? PLAYERSYMBOL[0] : PLAYERSYMBOL[1] };
        }
        if (playerX.length + playerY.length === 9) {
            return { draw: 1 };
        }
        return {};
    }

    const handleClick = (e: any) => {
        let buttonId = e.target.dataset.buttonId;
        if (winner || (buttonId === undefined)) {
            return;
        }

        let tempSquare = [...square];
        if (tempSquare[buttonId] === undefined) {
            tempSquare[buttonId] = currentPlayer;
            setSquare(tempSquare);
            setCurrentPlayer(prevPlayer => prevPlayer === PLAYERSYMBOL[0] ? PLAYERSYMBOL[1] : PLAYERSYMBOL[0]);
        }
    }

    const resetBoard = () => {
        setCurrentPlayer(PLAYERSYMBOL[0]);
        setWinner(null);
        setSquare(Array.from(new Array(9)));
    }

    return <div className={styles["board-container"]}>
        {winner != null ?
            winner === "DRAW" ?
                <div className={styles["board-header"]}><span>Draw</span> <button onClick={resetBoard}>Reset Board</button></div>
                :
                <div className={styles["board-header"]}><span>Winner is: {winner}</span> <button onClick={resetBoard}>Reset Board</button></div>
            :
            <div className={styles["board-header"]}>Current player: {currentPlayer}</div>
        }
        <div className={styles["board"]} onClick={handleClick}>
            {
                square.map((_, index) => {
                    let playerStyles = '';
                    if (square[index] === PLAYERSYMBOL[0]) {
                        playerStyles = 'player-one-styles';
                    } else if (square[index] === PLAYERSYMBOL[1]) {
                        playerStyles = 'player-two-styles';
                    }
                    return <Square key={index} className={playerStyles} displayValue={square[index]} buttonId={index} />
                })
            }
        </div>
    </div>;
}

export default Board;