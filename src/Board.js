import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=3, ncols=3, chanceLightStartsOn=0.5 }) {
  const [board, setBoard] = useState(() => {
    return createBoard(nrows, ncols, chanceLightStartsOn);
  });

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let y = 0; y < nrows; y++) {
      let row = [];
      for (let x = 0; x < ncols; x++) {
        let lightOn = Math.random() < chanceLightStartsOn;
        lightOn ? row.push(true) : row.push(false);
      }
      initialBoard.push(row);
    }
    console.log(initialBoard);
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
  }

  function flipCellsAround(coord) {
    setBoard(() => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard

      const boardCopy = board.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it

      flipCell(y, x, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);
      flipCell(y + 1, x + 1, boardCopy);
      flipCell(y - 1, x - 1, boardCopy);
      flipCell(y + 1, x - 1, boardCopy);
      flipCell(y - 1, x + 1, boardCopy);

      // TODO: return the copy

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO

  // make table board
  return (
    <>
    <h1>Lights out!</h1>
    <table className="Board">
      <tbody>
        {board.map((row, y)  => (
          <tr>
            {row.map((cell, x) => (
              <Cell isLit={cell} flipCellsAroundMe={() => flipCellsAround(`${y}-${x}`)} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default Board;
