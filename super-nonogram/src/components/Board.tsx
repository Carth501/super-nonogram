import Square from "./Square";

function Board() {
  const markSquare = (x: number, y: number) => {
    console.log(`Mark square at (${x}, ${y})`);
  };

  const flagSquare = (x: number, y: number) => {
    console.log(`Flag square at (${x}, ${y})`);
  };

  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        squares.push(
          <Square
            key={`${i}-${j}`}
            x={i}
            y={j}
            mark={markSquare}
            flag={flagSquare}
          />
        );
      }
    }
    return squares;
  };

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-0">{renderSquares()}</div>
  );
}

export default Board;
