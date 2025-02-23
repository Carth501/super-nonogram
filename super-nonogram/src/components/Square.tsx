import React from "react";

interface SquareProps {
  x: number;
  y: number;
  mark: (x: number, y: number) => void;
  flag: (x: number, y: number) => void;
}

const Square: React.FC<SquareProps> = ({ x, y, mark, flag }) => {
  const handleLeftClick = (event: React.MouseEvent) => {
    event.preventDefault();
    mark(x, y);
  };

  const handleRightClick = (event: React.MouseEvent) => {
    event.preventDefault();
    flag(x, y);
  };

  return (
    <div
      className="square"
      onClick={handleLeftClick}
      onContextMenu={handleRightClick}
      style={{ width: "20px", height: "20px", border: "1px solid black" }}
    ></div>
  );
};

export default Square;
