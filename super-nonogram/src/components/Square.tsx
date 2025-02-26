import React from "react";
import { SquareState } from "../services/squareState";
import { useSquareStore } from "../store";

interface SquareProps {
  x: number;
  y: number;
}

const Square: React.FC<SquareProps> = ({ x, y }) => {
  const squareState = useSquareStore((state) => state.squares[x][y]);

  return (
    <div
      className="square w-8 h-8 border-1 border-gray-800"
      onMouseEnter={() => useSquareStore.getState().enterSquare(x, y)}
      onMouseLeave={() => useSquareStore.getState().exitSquare()}
      style={{
        backgroundColor:
          squareState === SquareState.MARKED
            ? "black"
            : squareState === SquareState.FLAGGED
            ? "red"
            : "white",
        color:
          squareState === SquareState.NOTE_MARKED
            ? "black"
            : squareState === SquareState.NOTE_FLAGGED
            ? "red"
            : "black",
      }}
    >
      {squareState === SquareState.NOTE_MARKED ||
      squareState === SquareState.NOTE_FLAGGED
        ? "X"
        : ""}
    </div>
  );
};

export default Square;
