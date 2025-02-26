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
      className="square w-8 h-8 border-1 border-gray-800 flex justify-center items-center"
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
      squareState === SquareState.NOTE_FLAGGED ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="4"
          stroke="currentColor"
          className="size-6 align-middle"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      ) : (
        ""
      )}
    </div>
  );
};

export default Square;
