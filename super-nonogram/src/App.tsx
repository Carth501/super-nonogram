import Board from "./components/Board";

function App() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen w-screen">
        <h1>Super Nonogram</h1>
        <Board />
      </div>
    </>
  );
}

export default App;
