import Board from "./components/Board";
import { useSquareStore } from "./store";

function App() {
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

  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen w-screen"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
      >
        <h1 className="bg-red-200 select-none">Super Nonogram</h1>
        <Board />
      </div>
    </>
  );
}

export default App;
