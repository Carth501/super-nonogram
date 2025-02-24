import React from 'react';
import { SquareState } from '../services/squareState';
import { useSquareStore } from '../store';

interface SquareProps {
  x: number;
  y: number;
}

const Square: React.FC<SquareProps> = ({ x, y }) => {
  const squareState = useSquareStore((state) => state.squares[x][y]);

  return (
    <div
      className="square w-8 h-8 border-1 border-gray-50"
      onMouseEnter={() => useSquareStore.getState().enterSquare(x, y)}
      onMouseLeave={() => useSquareStore.getState().exitSquare()}
      style={{
        backgroundColor:
          squareState === SquareState.Marked
            ? 'black'
            : squareState === SquareState.Flagged
            ? 'red'
            : 'white',
      }}
    >
    </div>
  );
};

export default Square;
