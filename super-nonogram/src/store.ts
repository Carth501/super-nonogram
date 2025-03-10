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
  solved: boolean;
  gridSize: number;
  noteMode: boolean;
  setLeftButtonDown: (down: boolean) => void;
  setRightButtonDown: (down: boolean) => void;
  enterSquare: (x: number, y: number) => void;
  exitSquare: () => void;
  attemptMarkSquare: (x: number, y: number, clearing: boolean) => void;
  attemptFlagSquare: (x: number, y: number, clearing: boolean) => void;
  createTargetBoardState: () => void;
  solvePuzzle: () => void;
  checkSolution: () => boolean;
  newPuzzle: () => void;
  setNoteMode: (noteMode: boolean) => void;
  clearAllNotes: () => void;
}

const createEmptySquares = (): SquareState[][] => {
  const size = useSquareStore.getState().gridSize;
  return Array.from({ length: size }, () =>
    Array(size).fill(SquareState.EMPTY)
  );
};

const calculateRowHeaders = (board: SquareState[][]): number[][] => {
  return board.map((row) => {
    const headers = [];
    let count = 0;
    let total = 0;
    row.forEach((cell) => {
      if (cell === SquareState.MARKED) {
        count++;
        total++;
      } else if (count > 0) {
        headers.push(count);
        count = 0;
      }
    });
    if (count > 0) headers.push(count);
    if (total === 0) {
      headers.push(0);
    }
    return headers;
  });
};

const calculateColumnHeaders = (board: SquareState[][]): number[][] => {
  const size = board.length;
  const headers: number[][] = Array.from({ length: size }, () => []);
  for (let col = 0; col < size; col++) {
    let total = 0;
    let count = 0;
    for (let row = 0; row < size; row++) {
      if (board[row][col] === SquareState.MARKED) {
        count++;
        total++;
      } else if (count > 0) {
        headers[col].push(count);
        count = 0;
      }
    }
    if (count > 0) headers[col].push(count);
    if (total === 0) {
      headers[col].push(0);
    }
  }
  return headers;
};

const createTargetBoardState = (size: number): SquareState[][] => {
  const target = Array.from({ length: size }, () =>
    Array(size).fill(SquareState.EMPTY)
  );
  const marks = Math.ceil(size * size * 0.5);
  for (let i = 0; i < marks; i++) {
    let x = Math.floor(Math.random() * size);
    let y = Math.floor(Math.random() * size);
    while (target[x][y] === SquareState.MARKED) {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
    }
    target[x][y] = SquareState.MARKED;
  }
  return target;
};

const updateSquareState = (
  currentState: SquareState,
  noteMode: boolean,
  clearing: boolean,
  setting: SquareState,
  noteSetting: SquareState
): SquareState => {
  if (currentState === SquareState.EMPTY) {
    return noteMode ? noteSetting : setting;
  } else if (clearing && currentState === setting) {
    return SquareState.EMPTY;
  } else if (!noteMode && currentState === noteSetting) {
    return setting;
  } else if (clearing && noteMode && currentState === noteSetting) {
    return SquareState.EMPTY;
  }
  return currentState;
};

export const useSquareStore = create<SquareStore>((set) => ({
  gridSize: 10,
  squares: [],
  targetBoardState: [],
  rowHeaders: [],
  columnHeaders: [],
  leftButtonDown: false,
  rightButtonDown: false,
  x: null,
  y: null,
  solved: false,
  noteMode: false,
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
      if (state.solved) return state;
      const newSquares = state.squares.map((row) => row.slice());
      newSquares[x][y] = updateSquareState(
        newSquares[x][y],
        state.noteMode,
        clearing,
        SquareState.MARKED,
        SquareState.NOTE_MARKED
      );
      return { squares: newSquares };
    }),
  attemptFlagSquare: (x: number, y: number, clearing: boolean) =>
    set((state) => {
      if (state.solved) return state;
      const newSquares = state.squares.map((row) => row.slice());
      newSquares[x][y] = updateSquareState(
        newSquares[x][y],
        state.noteMode,
        clearing,
        SquareState.FLAGGED,
        SquareState.NOTE_FLAGGED
      );
      return { squares: newSquares };
    }),
  createTargetBoardState: () => {
    const targetBoardState = createTargetBoardState(
      useSquareStore.getState().gridSize
    );
    const rowHeaders = calculateRowHeaders(targetBoardState);
    const columnHeaders = calculateColumnHeaders(targetBoardState);
    set({ targetBoardState, rowHeaders, columnHeaders });
  },
  solvePuzzle: () =>
    set((state) => ({
      squares: state.targetBoardState,
      solved: true,
    })),
  checkSolution: () => {
    const { squares, targetBoardState } = useSquareStore.getState();
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        if (
          targetBoardState[i][j] == SquareState.MARKED &&
          squares[i][j] != SquareState.MARKED
        ) {
          return false;
        }
      }
    }
    set({ solved: true });
    return true;
  },
  newPuzzle: () => {
    const gridSize = useSquareStore.getState().gridSize;
    const targetBoardState = createTargetBoardState(gridSize);
    const rowHeaders = calculateRowHeaders(targetBoardState);
    const columnHeaders = calculateColumnHeaders(targetBoardState);
    set({
      squares: createEmptySquares(),
      targetBoardState,
      rowHeaders,
      columnHeaders,
      solved: false,
    });
  },
  setNoteMode: (noteMode: boolean) => set({ noteMode }),
  clearAllNotes: () =>
    set((state) => {
      const newSquares = state.squares.map((row) =>
        row.map((cell) =>
          cell === SquareState.NOTE_MARKED || cell === SquareState.NOTE_FLAGGED
            ? SquareState.EMPTY
            : cell
        )
      );
      return { squares: newSquares };
    }),
}));

useSquareStore.getState().newPuzzle();
