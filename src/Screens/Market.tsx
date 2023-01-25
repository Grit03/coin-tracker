import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { getCoins } from "../Functions/api";
import { CoinInterface, IWithMediaQuery } from "../types/interfaces";
import { useMediaQuery } from "react-responsive";

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

const ListContainer = styled.ul<IWithMediaQuery>`
  width: ${({ isMobile }) => (isMobile ? "50%" : "80%")};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  gap: 20px;
`;

const CoinList = styled.li`
  text-align: center;
  box-sizing: content-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  border-radius: 20px;
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
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
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
        <ListContainer isMobile={isMobile}>
          {data!.slice(0, 100).map((coin) => (
            <Link to={`/${coin.id}`} state={coin} key={coin.id}>
              <CoinList key={coin.id}>
                <Icon
                  key={`${coin.id}-icon`}
                  alt="coin-icon"
                  src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
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
