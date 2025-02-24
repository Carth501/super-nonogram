import { create } from "zustand";
import { SquareState } from "./services/squareState";

interface SquareStore {
  squares: SquareState[][];
  targetBoardState: SquareState[][];
  rowHeaders: number[][];
  columnHeaders: number[][];
  leftButtonDown: boolean;
  rightButtonDown: boolean;
  x: number | null;
  y: number | null;
  setLeftButtonDown: (down: boolean) => void;
  setRightButtonDown: (down: boolean) => void;
  enterSquare: (x: number, y: number) => void;
  exitSquare: () => void;
  attemptMarkSquare: (x: number, y: number, clearing: boolean) => void;
  attemptFlagSquare: (x: number, y: number, clearing: boolean) => void;
  createTargetBoardState: () => void;
  solvePuzzle: () => void;
}

const createEmptySquares = (size: number): SquareState[][] => {
  return Array.from({ length: size }, () =>
    Array(size).fill(SquareState.Empty)
  );
};

const calculateRowHeaders = (board: SquareState[][]): number[][] => {
  return board.map((row) => {
    const headers = [];
    let count = 0;
    row.forEach((cell) => {
      if (cell === SquareState.Marked) {
        count++;
      } else if (count > 0) {
        headers.push(count);
        count = 0;
      }
    });
    if (count > 0) headers.push(count);
    return headers;
  });
};

const calculateColumnHeaders = (board: SquareState[][]): number[][] => {
  const size = board.length;
  const headers: number[][] = Array.from({ length: size }, () => []);
  for (let col = 0; col < size; col++) {
    let count = 0;
    for (let row = 0; row < size; row++) {
      if (board[row][col] === SquareState.Marked) {
        count++;
      } else if (count > 0) {
        headers[col].push(count);
        count = 0;
      }
    }
    if (count > 0) headers[col].push(count);
  }
  return headers;
};

const createTargetBoardState = (size: number): SquareState[][] => {
  const target = Array.from({ length: size }, () =>
    Array(size).fill(SquareState.Empty)
  );
  const marks = Math.ceil(size * size * 0.5);
  for (let i = 0; i < marks; i++) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (target[x][y] === SquareState.Marked) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    }
    target[x][y] = SquareState.Marked;
  }
  return target;
};

export const useSquareStore = create<SquareStore>((set) => ({
  squares: createEmptySquares(5),
  targetBoardState: createEmptySquares(5),
  rowHeaders: [],
  columnHeaders: [],
  leftButtonDown: false,
  rightButtonDown: false,
  x: null,
  y: null,
  setLeftButtonDown: (down: boolean) =>
    set((state) => {
      if (down && state.x !== null && state.y !== null) {
        state.attemptMarkSquare(state.x, state.y, true);
      }
      return { leftButtonDown: down };
    }),
  setRightButtonDown: (down: boolean) =>
    set((state) => {
      if (down && state.x !== null && state.y !== null) {
        state.attemptFlagSquare(state.x, state.y, true);
      }
      return { rightButtonDown: down };
    }),
  enterSquare: (x: number, y: number) =>
    set((state) => {
      if (state.leftButtonDown) {
        state.attemptMarkSquare(x, y, false);
      } else if (state.rightButtonDown) {
        state.attemptFlagSquare(x, y, false);
      }
      return { x, y };
    }),
  exitSquare: () => set({ x: null, y: null }),
  attemptMarkSquare: (x: number, y: number, clearing: boolean) =>
    set((state) => {
      const newSquares = state.squares.map((row) => row.slice());
      if (newSquares[x][y] === SquareState.Empty) {
        newSquares[x][y] = SquareState.Marked;
      } else if (clearing && newSquares[x][y] === SquareState.Marked) {
        newSquares[x][y] = SquareState.Empty;
      }
      return { squares: newSquares };
    }),
  attemptFlagSquare: (x: number, y: number, clearing: boolean) =>
    set((state) => {
      const newSquares = state.squares.map((row) => row.slice());
      if (newSquares[x][y] === SquareState.Empty) {
        newSquares[x][y] = SquareState.Flagged;
      } else if (clearing && newSquares[x][y] === SquareState.Flagged) {
        newSquares[x][y] = SquareState.Empty;
      }
      return { squares: newSquares };
    }),
  createTargetBoardState: () => {
    const targetBoardState = createTargetBoardState(5);
    const rowHeaders = calculateRowHeaders(targetBoardState);
    const columnHeaders = calculateColumnHeaders(targetBoardState);
    set({ targetBoardState, rowHeaders, columnHeaders });
  },
  solvePuzzle: () =>
    set((state) => ({
      squares: state.targetBoardState,
    })),
}));

// Initialize the store with the target board state
useSquareStore.getState().createTargetBoardState();
