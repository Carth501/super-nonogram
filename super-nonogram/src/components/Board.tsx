import React from "react";
import { SquareState } from "../services/squareState";
import { useSquareStore } from "../store";
import Square from "./Square";

const Board: React.FC = () => {
  const squares = useSquareStore((state) => state.squares);
  const targetBoardState = useSquareStore((state) => state.targetBoardState);

  const getRowHeader = (row: SquareState[]) => {
    return row.filter((cell) => cell === SquareState.Marked).length;
  };

  const getColumnHeader = (colIndex: number) => {
    return targetBoardState.reduce((count, row) => {
      return count + (row[colIndex] === SquareState.Marked ? 1 : 0);
    }, 0);
  };

  return (
    <div className="board">
      <div className="column-headers flex">
        <div className="header-cell w-16 h-8"></div>
        {squares[0].map((_, colIndex) => (
          <div
            key={colIndex}
            className="header-cell w-8 h-16 flex items-center justify-center bg-gray-300"
          >
            {getColumnHeader(colIndex)}
          </div>
        ))}
      </div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="row flex">
          <div className="header-cell w-16 h-8 flex items-center justify-center bg-gray-300">
            {getRowHeader(targetBoardState[rowIndex])}
          </div>
          {row.map((cell, colIndex) => (
            <Square key={colIndex} x={rowIndex} y={colIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
