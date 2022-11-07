import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 50vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 1.2rem;
`;

function Loading() {
  return <Container>Loading...</Container>;
}

export default Loading;
