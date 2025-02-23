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

  return (
    <>
      <div
        className="flex flex-col justify-center items-center h-screen w-screen"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <h1 className="bg-red-200">Super Nonogram</h1>
        <Board />
      </div>
    </>
  );
}

export default App;
