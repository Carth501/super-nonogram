import React, { useEffect, useState } from "react";
import Board from "./components/Board";
import DebugMenu from "./components/DebugMenu";
import { useSquareStore } from "./store";

function App() {
  const [showDebugMenu, setShowDebugMenu] = useState(false);
  const setLeftButtonDown = useSquareStore((state) => state.setLeftButtonDown);
  const setRightButtonDown = useSquareStore(
    (state) => state.setRightButtonDown
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setLeftButtonDown(true);
    } else if (e.button === 2) {
      setRightButtonDown(true);
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (e.button === 0) {
      setLeftButtonDown(false);
    } else if (e.button === 2) {
      setRightButtonDown(false);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    (
      window as Window & typeof globalThis & { toggleDebugMenu?: () => void }
    ).toggleDebugMenu = () => {
      setShowDebugMenu((prev) => !prev);
    };
  }, []);

  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen w-screen"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        style={{ userSelect: "none" }}
      >
        <h1 className="text-2xl select-none">The Nonomancer</h1>
        <Board />
        {showDebugMenu && <DebugMenu />}
      </div>
    </>
  );
}

export default App;
