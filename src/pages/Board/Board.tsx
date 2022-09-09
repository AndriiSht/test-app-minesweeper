import { useState, useEffect } from 'react';
import { CellDetails, createBoard, revealed } from 'src/utils';
import { Cell } from './components';
import styled from 'styled-components';
import { Container } from 'src/components';

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  color: #f7cf06;
`;

const Heading = styled.div`
  padding-top: 10px;
  text-align: center;
  color: #f7cf06;
  font-size: 35px;
`;

const Aligned = styled.div`
  display: flex;
  margin: 40px auto;
  justify-content: center;
  align-items: center;
`;

function Board() {
  const [grid, setGrid] = useState<CellDetails[][]>([]);
  const [nonMineCount, setNonMineCount] = useState(0);
  const [mineLocation, setMineLocation] = useState<[x: number, y: number][]>([]);

  useEffect(() => {
    freshBoard();
  }, []);

  // Making freshboard at start
  const freshBoard = () => {
    const newBoard = createBoard(10, 10, 20);
    setNonMineCount(10 * 10 - 20);
    setMineLocation(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  const newFresh = () => {
    freshBoard();
  };

  const revealCell = (x: number, y: number) => {
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === 'X') {
      for (let i = 0; i < mineLocation.length; i++) {
        newGrid[mineLocation[i][0]][mineLocation[i][1]].revealed = true;
      }
      setGrid(newGrid);
      setTimeout(newFresh, 500);
    }
    if (nonMineCount === 0) {
      setTimeout(newFresh, 500);
    } else {
      let revealedBoard = revealed(newGrid, x, y, nonMineCount);
      setGrid(revealedBoard.arr);
      setNonMineCount(revealedBoard.newNonMines);
    }
  };

  return (
    <Container>
      <Heading>
        <h1>MineSweeper</h1>
      </Heading>
      <Aligned>
        <div>
          <div>
            {grid.map((singleRow, index1) => {
              return (
                <Row key={index1}>
                  {singleRow.map((singleCol, index2) => {
                    return <Cell details={singleCol} key={index2} revealCell={revealCell} />;
                  })}
                </Row>
              );
            })}
          </div>
        </div>
      </Aligned>
    </Container>
  );
}

export default Board;
