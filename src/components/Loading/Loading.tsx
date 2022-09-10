import styled from 'styled-components';
import { Container, Heading } from '../Styled';

const ContainerStyled = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = () => {
  return (
    <ContainerStyled>
      <Heading>Loading ...</Heading>
    </ContainerStyled>
  );
};
