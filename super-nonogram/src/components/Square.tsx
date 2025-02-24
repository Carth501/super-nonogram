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
      className="square"
      onMouseEnter={() => useSquareStore.getState().enterSquare(x, y)}
      onMouseLeave={() => useSquareStore.getState().exitSquare()}
      style={{
        width: '20px',
        height: '20px',
        border: '1px solid black',
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
