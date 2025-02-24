
import Square from './Square';

function Board() {

  const renderSquares = () => {
    const squares = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        squares.push(<Square key={`${i}-${j}`} x={i} y={j} />);
      }
    }
    return squares;
  };

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-0" >
      {renderSquares()}
    </div>
  );
}

export default Board;
