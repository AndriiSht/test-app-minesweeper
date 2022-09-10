import { useState, useEffect, useCallback } from 'react';
import { CellDetails, createBoard, revealed } from 'src/utils';
import { Cell } from './components';
import styled from 'styled-components';
import { Button, Container, Heading } from 'src/components';
import { useBoardSizeState } from 'src/hooks';
import { useNavigate } from 'react-router-dom';
import { pageUrl } from 'src/const';

const ContainerStyled = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  color: #f7cf06;
`;

const Aligned = styled.div`
  display: flex;
  margin: 40px auto;
  justify-content: center;
  align-items: center;
`;

const ButtonStyled = styled(Button)`
  min-width: 200px;
  margin-bottom: 30px;
`;

const SubHeading = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #f7cf06;
`;

function Board() {
  const [board, setBoard] = useState<CellDetails[][]>([]);
  const [explode, setExplode] = useState(false);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocation, setMineLocation] = useState<[x: number, y: number][]>([]);
  const [boardSize] = useBoardSizeState();

  const restartBoard = useCallback(() => {
    const newBoard = createBoard(boardSize.rows, boardSize.cols, boardSize.mines);
    setNonMineCount(boardSize.rows * boardSize.cols - boardSize.mines);
    setMineLocation(newBoard.mineLocation);
    setBoard(newBoard.board);
    setExplode(false);
  }, [boardSize]);

  useEffect(() => {
    restartBoard();
  }, [restartBoard]);

  const navigate = useNavigate();

  const revealCell = useCallback(
    (x: number, y: number) => {
      let newBoard = [...board];
      if (newBoard[x][y].value === 'X' || nonMineCount === 0) {
        for (let i = 0; i < mineLocation.length; i++) {
          newBoard[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
        }
        setBoard(newBoard);
        setExplode(true);
      }
      let revealedBoard = revealed(newBoard, x, y, nonMineCount);
      setBoard(revealedBoard.arr);
      setNonMineCount(revealedBoard.newNonMines);
    },
    [board, mineLocation, nonMineCount],
  );

  const onSetupBoardClick = () => navigate(pageUrl.setupSession);

  const onRestartClick = () => restartBoard();

  const headingString = explode
    ? 'Oooops... Too bad!'
    : nonMineCount === 0
    ? '!!! Victory !!!'
    : 'MineSweeper';

  return (
    <ContainerStyled>
      <Heading>{headingString}</Heading>
      <SubHeading>Mines: {boardSize.mines}</SubHeading>
      <Aligned>
        <div>
          {board.map((singleRow, index1) => {
            return (
              <Row key={index1}>
                {singleRow.map((singleCol, index2) => {
                  return <Cell details={singleCol} key={index2} revealCell={revealCell} />;
                })}
              </Row>
            );
          })}
        </div>
      </Aligned>
      <ButtonStyled onClick={onRestartClick}>Restart</ButtonStyled>
      <ButtonStyled onClick={onSetupBoardClick}>Setup the board size</ButtonStyled>
    </ContainerStyled>
  );
}

export default Board;
