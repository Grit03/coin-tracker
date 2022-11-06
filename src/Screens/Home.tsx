import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

// Interfaces
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

// Styeld Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: 700;
`;

const CoinList = styled.li`
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 10px;
  background-color: #f9fafb;
  margin-bottom: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease-in;
  a {
    color: #0e1117;
    padding: 17px;
    transition: color 0.2s ease-in;
    width: 100%;
    display: block;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
  &:hover {
    background-color: #dfdfde;
    img {
      opacity: 0.8;
    }
    cursor: pointer;
  }
`;

const Icon = styled.img`
  margin: 0px 10px;
  width: 30px;
  height: 30px;
`;

function Home() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100));
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인 시세 확인 💰</Title>
      </Header>
      <ul>
        {coins.map((coin) => (
          <CoinList key={coin.id}>
            <Icon
              alt="coin-icon"
              src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
            />
            <Link to={`${coin.id}`}>{coin.name} &rarr;</Link>
          </CoinList>
        ))}
      </ul>
    </Container>
  );
}

export default Home;
