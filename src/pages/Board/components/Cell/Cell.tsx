import { CellDetails } from 'src/utils';
import styled from 'styled-components';

const CellNode = styled.div<{ revealed: CellDetails['revealed']; value: CellDetails['value'] }>`
  width: 40px;
  height: 40px;
  background-color: ${({ revealed, value }) =>
    revealed && value !== 0
      ? value === 'X'
        ? 'red'
        : '#0254b1'
      : revealed && value === 0
      ? '#0254b1'
      : '#000'};
  opacity: 0.8;
  border: 3px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  color: #f7cf06;
  font-weight: bold;
`;

interface CellProps {
  details: CellDetails;
  revealCell: (x: number, y: number) => void;
}

export function Cell({ details, revealCell }: CellProps) {
  const onCellClick = () => revealCell(details.x, details.y);

  const value =
    details.revealed && details.value !== 0 ? (details.value === 'X' ? '💣' : details.value) : '';

  return (
    <CellNode value={details.value} revealed={details.revealed} onClick={onCellClick}>
      {value}
    </CellNode>
  );
}
