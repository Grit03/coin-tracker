import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const floating = keyframes`
  from {
    transform : translate(0, 0);
  }
  to {
    transform : translate(0, -15px);
  }
`;

const Container = styled.section`
  width: 100%;
  height: 80%;
  margin-top: 11vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10%;
`;

const Title = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  min-width: 150px;
  word-break: keep-all;
  text-align: center;
  font-size: 2.3rem;
  font-weight: 700;
  line-height: 1.5;
  margin-right: 20px;
`;

const Img = styled.img`
  width: 400px;
  min-width: 150px;
  animation: ${floating} 1.8s infinite ease-in-out alternate;
`;

const Btn = styled.button`
  border: 2px solid ${(props) => props.theme.containerColor};
  width: 150px;
  text-align: center;
  padding: 10px 20px;
  margin-top: 30px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.containerColor};
  color: ${(props) => props.theme.textColor};
  &:hover {
    color: ${(props) => props.theme.accentColor};
    background-color: ${(props) => props.theme.containerFocusColor};
    border: 2px solid ${(props) => props.theme.accentColor};
  }
`;

function Home() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/market");
  };
  return (
    <>
      <Container>
        <Title>
          암호화폐를 구매하기 전에,
          <br />
          먼저 자세한 시세를 조회해보세요!
          <Btn onClick={onClick}>시세 조회 &rarr;</Btn>
        </Title>
        <Img src="/homepage.png" />
      </Container>
    </>
  );
}

export default Home;
