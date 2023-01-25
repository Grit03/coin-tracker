import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  width: 100%;
  height: 50vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    margin-top: 1.5rem;
    font-weight: 500;
    font-size: 1.2rem;
  }
`;

function Loading() {
  return (
    <Container>
      <FontAwesomeIcon icon={faSpinner} size="xl" spin />
      <span>Loading...</span>
    </Container>
  );
}

export default Loading;
