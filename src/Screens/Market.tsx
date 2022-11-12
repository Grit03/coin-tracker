import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { getCoins } from "../Functions/api";
import { CoinInterface } from "../types/apiDataTypes";

// Styeld Components
const Container = styled.div`
  margin-top: 11vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.h1`
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4vh;
`;

const ListContainer = styled.ul`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  margin: 0 auto;
`;

const CoinList = styled.li`
  margin: 0px 10px;
  margin-bottom: 20px;
  text-align: center;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border-radius: 7%;
  background-color: ${(props) => props.theme.containerColor};
  border: 2px solid ${(props) => props.theme.containerColor};
  transition: all 0.15s ease-in;
  color: ${(props) => props.theme.textColor};
  div {
    width: 70%;
    color: inherit;
    font-size: 1.2rem;
    font-weight: 500;
    line-height: 1.5;
    text-transform: uppercase;
  }
  &:hover {
    background-color: ${(props) => props.theme.containerFocusColor};
    color: ${(props) => props.theme.accentColor};
    border: 2px solid ${(props) => props.theme.accentColor};
  }
  overflow: hidden;
`;

const Icon = styled.img`
  margin: 20px 0px;
  width: 40px;
  height: 40px;
`;

function Market() {
  const { isLoading, data } = useQuery<CoinInterface[]>({
    queryKey: ["allCoins"],
    queryFn: getCoins,
  });
  return (
    <Container>
      <Title>코인 시세 확인 💰</Title>
      {isLoading ? (
        <Loading />
      ) : (
        <ListContainer>
          {data!.slice(0, 100).map((coin) => (
            <Link to={`/${coin.id}`} state={coin} key={coin.id}>
              <CoinList key={coin.id}>
                <Icon
                  key={`${coin.id}-icon`}
                  alt="coin-icon"
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                <div key={coin.name}>
                  {coin.name} <br />
                  &rarr;
                </div>
              </CoinList>
            </Link>
          ))}
        </ListContainer>
      )}
    </Container>
  );
}

export default Market;
