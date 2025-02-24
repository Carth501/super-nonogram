import { create } from "zustand";
import { SquareState } from "./services/squareState";

interface SquareStore {
  squares: SquareState[][];
  targetBoardState: SquareState[][];
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
  createTargetBoardState: () => SquareState[][];
}

const createEmptySquares = (size: number): SquareState[][] => {
  return Array.from({ length: size }, () =>
    Array(size).fill(SquareState.Empty)
  );
};

const createTargetBoardState = (size: number): SquareState[][] => {
  const target = Array.from({ length: size }, () =>
    Array(size).fill(SquareState.Empty)
  );
  const marks = Math.ceil(size * size * 0.5);
  for (let i = 0; i < marks; i++) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (target[x][y] == SquareState.Marked) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    }
    target[x][y] = SquareState.Marked;
  }
  return target;
};

export const useSquareStore = create<SquareStore>((set) => ({
  squares: createEmptySquares(5),
  targetBoardState: createTargetBoardState(5),
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
  createTargetBoardState: () => createTargetBoardState(5),
}));
