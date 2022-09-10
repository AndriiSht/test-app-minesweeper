import { atom, useRecoilState } from 'recoil';
import { atomKeys } from '../atomKeys';

export const boardSIzeState = atom({
  key: atomKeys.boardSize,
  default: {
    rows: 10,
    cols: 10,
    mines: 5,
  },
});

export const useBoardSizeState = () => useRecoilState(boardSIzeState);
