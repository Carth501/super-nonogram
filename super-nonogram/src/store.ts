import { create } from "zustand";
import { SquareState } from "./services/squareState";

interface SquareStore {
  squares: SquareState[][];
  leftButtonDown: boolean;
  rightButtonDown: boolean;
  setLeftButtonDown: (down: boolean) => void;
  setRightButtonDown: (down: boolean) => void;
  enterSquare: (x: number, y: number) => void;
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
  setLeftButtonDown: (down: boolean) => set({ leftButtonDown: down }),
  setRightButtonDown: (down: boolean) => set({ rightButtonDown: down }),
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
      return { squares: newSquares };
    }),
}));
