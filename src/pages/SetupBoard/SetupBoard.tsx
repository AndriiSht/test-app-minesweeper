import { Container } from 'src/components';
import styled from 'styled-components';

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
  padding: 0 10px;
`;

const InputWrapper = styled.div``;

export const SetupBoard = () => {
  return (
    <Container>
      <Wrapper>
        <InputWrapper>
          <Label>
            Width
            <Input type="number" />
          </Label>
        </InputWrapper>
      </Wrapper>
    </Container>
  );
};

export default SetupBoard;
