export interface CellDetails {
  revealed: boolean;
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'X';
  x: number;
  y: number;
}

export enum Dimensions {
  cols = 'cols',
  rows = 'rows',
  mines = 'mines',
}
