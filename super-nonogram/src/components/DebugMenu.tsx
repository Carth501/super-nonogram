import React from "react";
import { useSquareStore } from "../store";

const DebugMenu: React.FC = () => {
  const solvePuzzle = useSquareStore((state) => state.solvePuzzle);

  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-gray-200 border border-gray-400">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={solvePuzzle}
      >
        Solve
      </button>
    </div>
  );
};

export default DebugMenu;
