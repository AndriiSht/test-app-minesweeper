import { CellDetails } from './reveal';

type MineLocation = [x: number, y: number][];

export function createBoard(row: number, col: number, mines: number) {
  // Board for storing the values for each cell
  let board: CellDetails[][] = [];
  // Tracking the mine location
  let mineLocation: MineLocation = [];
  // Create blank board

  for (let x = 0; x < row; x++) {
    let subCol: CellDetails[] = [];
    for (let y = 0; y < col; y++) {
      subCol.push({
        value: 0,
        revealed: false,
        x: x,
        y: y,
      });
    }
    board.push(subCol);
  }

  // Randomize Bomb Placement
  let minesCount = 0;
  while (minesCount < mines) {
    // Implementing random function
    let x = random(0, row - 1);
    let y = random(0, col - 1);

    // placing bomb at random location(x,y) on board[x][y]
    if (board[x][y].value === 0) {
      board[x][y].value = 'X';
      mineLocation.push([x, y]);
      minesCount++;
    }
  }

  // Increasing the value of specific cell
  // If the cell has mines increasing the cell value by 1.
  // Add Numbers
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j].value === 'X') {
        continue;
      }

      // Top
      if (i > 0 && board[i - 1][j].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Top Right
      if (i > 0 && j < col - 1 && board[i - 1][j + 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Right
      if (j < col - 1 && board[i][j + 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Botoom Right
      if (i < row - 1 && j < col - 1 && board[i + 1][j + 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Bottom
      if (i < row - 1 && board[i + 1][j].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Bottom Left
      if (i < row - 1 && j > 0 && board[i + 1][j - 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // LEft
      if (j > 0 && board[i][j - 1].value === 'X') {
        (board[i][j].value as number)++;
      }

      // Top Left
      if (i > 0 && j > 0 && board[i - 1][j - 1].value === 'X') {
        (board[i][j].value as number)++;
      }
    }
  }
  return { board, mineLocation };
}

// Random function used for generating random value of x & y
function random(min = 0, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
