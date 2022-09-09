export interface CellDetails {
  revealed: boolean;
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'X';
  x: number;
  y: number;
}

export const revealed = (arr: CellDetails[][], x: number, y: number, newNonMines: number) => {
  // all the cells which are adjacent to zero must be stored in the array
  // so that it can be revealed later

  let show = [];
  show.push(arr[x][y]);
  while (show.length !== 0) {
    let cell: CellDetails = show.pop() as CellDetails;
    if (!cell?.revealed) {
      newNonMines--;
      cell.revealed = true;
    }
    if (cell?.value !== 0) {
      break;
    }

    // top left

    if (
      cell.x > 0 &&
      cell.y > 0 &&
      arr[cell.x - 1][cell.y - 1].value === 0 &&
      !arr[cell.x - 1][cell.y - 1].revealed
    ) {
      show.push(arr[cell.x - 1][cell.y - 1]);
    }

    // bottom right

    if (
      cell.x < arr.length - 1 &&
      cell.y < arr[0].length - 1 &&
      arr[cell.x + 1][cell.y + 1].value === 0 &&
      !arr[cell.x + 1][cell.y + 1].revealed
    ) {
      show.push(arr[cell.x + 1][cell.y + 1]);
    }

    // top right

    if (
      cell.x > 0 &&
      cell.y < arr[0].length - 1 &&
      arr[cell.x - 1][cell.y + 1].value === 0 &&
      !arr[cell.x - 1][cell.y + 1].revealed
    ) {
      show.push(arr[cell.x - 1][cell.y + 1]);
    }

    // bottom left

    if (
      cell.x < arr.length - 1 &&
      cell.y > 0 &&
      arr[cell.x + 1][cell.y - 1].value === 0 &&
      !arr[cell.x + 1][cell.y - 1].revealed
    ) {
      show.push(arr[cell.x + 1][cell.y - 1]);
    }

    // top
    if (cell.x > 0 && arr[cell.x - 1][cell.y].value === 0 && !arr[cell.x - 1][cell.y].revealed) {
      show.push(arr[cell.x - 1][cell.y]);
    }

    // right

    if (
      cell.y < arr[0].length - 1 &&
      arr[cell.x][cell.y + 1].value === 0 &&
      !arr[cell.x][cell.y + 1].revealed
    ) {
      show.push(arr[cell.x][cell.y + 1]);
    }

    // bottom

    if (
      cell.x < arr.length - 1 &&
      arr[cell.x + 1][cell.y].value === 0 &&
      !arr[cell.x + 1][cell.y].revealed
    ) {
      show.push(arr[cell.x + 1][cell.y]);
    }

    // left

    if (cell.y > 0 && arr[cell.x][cell.y - 1].value === 0 && !arr[cell.x][cell.y - 1].revealed) {
      show.push(arr[cell.x][cell.y - 1]);
    }

    // start revealing the item

    if (cell.x > 0 && cell.y > 0 && !arr[cell.x - 1][cell.y - 1].revealed) {
      //Top Left Reveal

      arr[cell.x - 1][cell.y - 1].revealed = true;
      newNonMines--;
    }

    if (cell.y > 0 && !arr[cell.x][cell.y - 1].revealed) {
      // Left Reveal
      arr[cell.x][cell.y - 1].revealed = true;
      newNonMines--;
    }

    if (cell.x < arr.length - 1 && cell.y > 0 && !arr[cell.x + 1][cell.y - 1].revealed) {
      //Bottom Left Reveal
      arr[cell.x + 1][cell.y - 1].revealed = true;
      newNonMines--;
    }

    if (cell.x > 0 && !arr[cell.x - 1][cell.y].revealed) {
      //Top Reveal
      arr[cell.x - 1][cell.y].revealed = true;
      newNonMines--;
    }

    if (cell.x < arr.length - 1 && !arr[cell.x + 1][cell.y].revealed) {
      // Bottom Reveal
      arr[cell.x + 1][cell.y].revealed = true;
      newNonMines--;
    }

    if (cell.x > 0 && cell.y < arr[0].length - 1 && !arr[cell.x - 1][cell.y + 1].revealed) {
      // Top Right Reveal
      arr[cell.x - 1][cell.y + 1].revealed = true;
      newNonMines--;
    }

    if (cell.y < arr[0].length - 1 && !arr[cell.x][cell.y + 1].revealed) {
      //Right Reveal
      arr[cell.x][cell.y + 1].revealed = true;
      newNonMines--;
    }

    if (
      cell.x < arr.length - 1 &&
      cell.y < arr[0].length - 1 &&
      !arr[cell.x + 1][cell.y + 1].revealed
    ) {
      // Bottom Right Reveal
      arr[cell.x + 1][cell.y + 1].revealed = true;
      newNonMines--;
    }
  }

  return { arr, newNonMines };
};
