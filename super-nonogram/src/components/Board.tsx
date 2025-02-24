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
        {columnHeaders.map((header, colIndex) => (
          <div
            key={colIndex}
            className="header-cell w-8 min-h-16 flex flex-col items-center justify-center bg-gray-300"
          >
            {header.map((num, index) => (
              <div key={index}>{num}</div>
            ))}
          </div>
        ))}
      </div>
      {squares.map((row, rowIndex) => (
        <div key={rowIndex} className="row flex">
          <div className="header-cell min-w-16 h-8 flex flex-row gap-3 items-center justify-center bg-gray-300">
            {rowHeaders[rowIndex].map((num, index) => (
              <div key={index}>{num}</div>
            ))}
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
