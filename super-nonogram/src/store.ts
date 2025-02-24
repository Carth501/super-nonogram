import { create } from "zustand";
import { SquareState } from "./services/squareState";

interface SquareStore {
  squares: SquareState[][];
  markSquare: (x: number, y: number) => void;
  flagSquare: (x: number, y: number) => void;
}

export const useSquareStore = create<SquareStore>((set) => ({
  squares: Array(5).fill(Array(5).fill(SquareState.Empty)),
  markSquare: (x, y) =>
    set((state) => {
      const newSquares = state.squares.map((row, rowIndex) =>
        row.map((square, colIndex) =>
          rowIndex === x && colIndex === y ? SquareState.Marked : square
        )
      );
      return { squares: newSquares };
    }),
  flagSquare: (x, y) =>
    set((state) => {
      const newSquares = state.squares.map((row, rowIndex) =>
        row.map((square, colIndex) =>
          rowIndex === x && colIndex === y ? SquareState.Flagged : square
        )
      );
      return { squares: newSquares };
    }),
}));
