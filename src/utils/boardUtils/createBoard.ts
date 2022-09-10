import { CellDetails } from './types';

type MineLocation = [x: number, y: number][];

function random(min = 0, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function createBoard(rows: number, columns: number, mines: number) {
  let board: CellDetails[][] = [];

  let mineLocation: MineLocation = [];

  // Create empty board with all cells ------ >
  for (let x = 0; x < rows; x++) {
    let column: CellDetails[] = [];
    for (let y = 0; y < columns; y++) {
      column.push({
        value: 0,
        revealed: false,
        x: x,
        y: y,
      });
    }
    board.push(column);
  }
  // Create empty board with all cells ------ >

  // Randomize Bomb Placement ------>
  let minesCount = 0;
  while (minesCount < mines) {
    let x = random(0, rows - 1);
    let y = random(0, columns - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = 'X';
      mineLocation.push([x, y]);
      minesCount++;
    }
  }
  // Randomize Bomb Placement ------>

  // Set mine count for cell for all mines around ----->
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j].value === 'X') {
        continue;
      }

      // Top
      if (i > 0 && board[i - 1][j].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Top Right
      if (i > 0 && j < columns - 1 && board[i - 1][j + 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Right
      if (j < columns - 1 && board[i][j + 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Bottom Right
      if (i < rows - 1 && j < columns - 1 && board[i + 1][j + 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Bottom
      if (i < rows - 1 && board[i + 1][j].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Bottom Left
      if (i < rows - 1 && j > 0 && board[i + 1][j - 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Left
      if (j > 0 && board[i][j - 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Top Left
      if (i > 0 && j > 0 && board[i - 1][j - 1].value === 'X') {
        (board[i][j].value as number)++;
      }
    }
  }
  // Set mine count for cell for all mines around ----->

  return { board, mineLocation };
}
