import React from "react";
import { useSquareStore } from "../store";
import Square from "./Square";

const Board: React.FC = () => {
  const squares = useSquareStore((state) => state.squares);
  const rowHeaders = useSquareStore((state) => state.rowHeaders);
  const columnHeaders = useSquareStore((state) => state.columnHeaders);

  return (
    <div className="board">
      <div className="column-headers flex">
        <div className="header-cell w-16 h-8"></div>
        {columnHeaders.map((header: number, colIndex: number) => (
          <div
            key={colIndex}
            className="header-cell w-8 h-16 flex items-center justify-center bg-gray-300"
          >
            {header}
          </div>
        ))}
      </div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="row flex">
          <div className="header-cell w-16 h-8 flex items-center justify-center bg-gray-300">
            {rowHeaders[rowIndex]}
          </div>
          {row.map((_, colIndex) => (
            <Square key={colIndex} x={rowIndex} y={colIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
