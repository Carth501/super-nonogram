import { create } from "zustand";
import { SquareState } from "./services/squareState";

interface SquareStore {
  squares: SquareState[][];
  leftButtonDown: boolean;
  rightButtonDown: boolean;
  x: number | null;
  y: number | null;
  setLeftButtonDown: (down: boolean) => void;
  setRightButtonDown: (down: boolean) => void;
  enterSquare: (x: number, y: number) => void;
  exitSquare: () => void;
}

const createEmptySquares = (size: number): SquareState[][] => {
  return Array.from({ length: size }, () =>
    Array(size).fill(SquareState.Empty)
  );
};

export const useSquareStore = create<SquareStore>((set) => ({
  squares: createEmptySquares(5),
  leftButtonDown: false,
  rightButtonDown: false,
  x: null,
  y: null,
  setLeftButtonDown: (down: boolean) =>
    set((state) => {
      if (down && state.x !== null && state.y !== null) {
        const newSquares = state.squares.map((row) => row.slice()); // Create a shallow copy of the squares array
        newSquares[state.x][state.y] =
          newSquares[state.x][state.y] === SquareState.Marked
            ? SquareState.Empty
            : SquareState.Marked;
        return { leftButtonDown: down, squares: newSquares };
      }
      return { leftButtonDown: down };
    }),
  setRightButtonDown: (down: boolean) =>
    set((state) => {
      if (down && state.x !== null && state.y !== null) {
        const newSquares = state.squares.map((row) => row.slice()); // Create a shallow copy of the squares array
        newSquares[state.x][state.y] =
          newSquares[state.x][state.y] === SquareState.Flagged
            ? SquareState.Empty
            : SquareState.Flagged;
        return { rightButtonDown: down, squares: newSquares };
      }
      return { rightButtonDown: down };
    }),
  enterSquare: (x: number, y: number) =>
    set((state) => {
      const newSquares = state.squares.map((row) => row.slice()); // Create a shallow copy of the squares array
      if (state.leftButtonDown) {
        newSquares[x][y] =
          newSquares[x][y] === SquareState.Marked
            ? SquareState.Empty
            : SquareState.Marked;
      } else if (state.rightButtonDown) {
        newSquares[x][y] =
          newSquares[x][y] === SquareState.Flagged
            ? SquareState.Empty
            : SquareState.Flagged;
      }
      return { squares: newSquares, x, y };
    }),
  exitSquare: () => set({ x: null, y: null }),
}));
