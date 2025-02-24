import React from 'react';
import { SquareState } from '../services/squareState';
import { useSquareStore } from '../store';

interface SquareProps {
  x: number;
  y: number;
}

const Square: React.FC<SquareProps> = ({ x, y }) => {
  const markSquare = useSquareStore((state) => state.markSquare);
  const flagSquare = useSquareStore((state) => state.flagSquare);
  const squareState = useSquareStore((state) => state.squares[x][y]);

  const handleLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    markSquare(x, y);
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    flagSquare(x, y);
  };

  return (
    <div
      className="square"
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
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
