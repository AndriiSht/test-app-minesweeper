import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Heading } from 'src/components';
import { pageUrl } from 'src/const';
import { useBoardSizeState } from 'src/hooks';
import { Dimensions } from 'src/utils';
import styled from 'styled-components';

const ContainerStyled = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonStyled = styled(Button)`
  margin-top: 30px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Input = styled.input`
  background-color: #f7cf06;
  height: 30px;
  color: #0254b1;
  font-size: 18px;
  font-weight: bold;
`;

const Label = styled.label`
  color: #f7cf06;
  font-size: 20px;
  font-weight: bold;
`;

const LabelText = styled.span`
  display: inline-block;
  padding: 0 10px 0 0;
  margin: 20px 0;
  min-width: 170px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SetupBoard = () => {
  const [boardSize, setBoardSize] = useBoardSizeState();
  const navigate = useNavigate();

  const updateBoardDimensions = (dimension: Dimensions) => (e: ChangeEvent<HTMLInputElement>) => {
    const numberValue = +e.target.value;
    if (dimension !== Dimensions.mines) {
      if (5 <= numberValue && numberValue <= 15) {
        setBoardSize((oldState) => ({ ...oldState, [dimension]: numberValue }));
      }
    } else {
      if (3 <= numberValue && numberValue <= 10) {
        setBoardSize((oldState) => ({ ...oldState, [dimension]: numberValue }));
      }
    }
  };

  const onStartClick = () => navigate(pageUrl.session);

  return (
    <ContainerStyled>
      <Wrapper>
        <InputWrapper>
          <Heading>Board Settings</Heading>
          <Label>
            <LabelText>Columns (5-15)</LabelText>
            <Input
              onChange={updateBoardDimensions(Dimensions.cols)}
              type="number"
              value={boardSize.cols}
            />
          </Label>
          <Label>
            <LabelText>Rows (5 - 15)</LabelText>
            <Input
              onChange={updateBoardDimensions(Dimensions.rows)}
              type="number"
              value={boardSize.rows}
            />
          </Label>
          <Label>
            <LabelText>Mines (3-10)</LabelText>
            <Input
              onChange={updateBoardDimensions(Dimensions.mines)}
              type="number"
              value={boardSize.mines}
            />
          </Label>
          <ButtonStyled onClick={onStartClick}>Start</ButtonStyled>
        </InputWrapper>
      </Wrapper>
    </ContainerStyled>
  );
};

export default SetupBoard;
