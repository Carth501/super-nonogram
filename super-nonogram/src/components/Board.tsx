import { Switch } from "@/components/ui/switch";
import React from "react";
import { useSquareStore } from "../store";
import Square from "./Square";
import { Label } from "./ui/label";

const Board: React.FC = () => {
  const squares = useSquareStore((state) => state.squares);
  const rowHeaders = useSquareStore((state) => state.rowHeaders);
  const columnHeaders = useSquareStore((state) => state.columnHeaders);
  const checkSolution = useSquareStore((state) => state.checkSolution);
  const solved = useSquareStore((state) => state.solved);
  const newPuzzle = useSquareStore((state) => state.newPuzzle);
  const noteMode = useSquareStore((state) => state.noteMode);
  const setNoteMode = useSquareStore((state) => state.setNoteMode);
  const clearAllNotes = useSquareStore((state) => state.clearAllNotes);

  const handleSubmit = () => {
    const isCorrect = checkSolution();
    if (isCorrect) {
      alert("Congratulations! You solved the puzzle.");
    } else {
      alert("The solution is incorrect. Please try again.");
    }
  };

  return (
    <div className="board">
      <table className="table-auto border-collapse">
        <thead>
          <tr>
            <th></th>
            {columnHeaders.map((header, colIndex) => (
              <th
                key={colIndex}
                className="w-8 min-h-16 bg-gray-300 align-bottom"
              >
                {header.map((num, index) => (
                  <div key={index}>{num}</div>
                ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {squares.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="min-w-16 h-8 bg-gray-300 flex flex-row justify-end items-center gap-3 pl-2 pr-2 font-bold">
                {rowHeaders[rowIndex].map((num, index) => (
                  <div key={index}>{num}</div>
                ))}
              </td>
              {row.map((_, colIndex) => (
                <td key={colIndex}>
                  <Square x={rowIndex} y={colIndex} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex flex-row">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <div className="ml-4 pl-2 pr-2 flex flex-col items-center">
          <Label htmlFor="notes-mode">Notes Mode</Label>
          <Switch
            id="notes-mode"
            checked={noteMode}
            onCheckedChange={setNoteMode}
          />
        </div>
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={clearAllNotes}
        >
          Clear Notes
        </button>
        {solved && (
          <button
            className="ml-4 px-4 py-2 bg-green-500 text-white rounded"
            onClick={newPuzzle}
          >
            New Puzzle
          </button>
        )}
      </div>
    </div>
  );
};

export default Board;
