import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { priceWithComma } from "../Functions/numberFunctions";
import { IInfodata, IPriceData } from "../types/apiDataTypes";
// styled-components
const Container = styled.section`
  margin-top: 12vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-width: 300px;
`;

const Discription = styled.p`
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 50%;
`;

const Text = styled.div`
  text-align: center;
  color: ${(props) => props.color};
  font-size: 1.2rem;
  font-weight: 600;
`;

const Content = styled.div`
  min-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  ${Text}:not(:last-child) {
    margin-right: 40px;
  }
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 15px 25px;
  border-radius: 10px;
  margin-bottom: 20px;
  ${OverviewItem}:not(:last-child) {
    margin-right: 25px;
  }
`;

const Title = styled.header`
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  align-items: center;
  margin-bottom: 3vh;
`;

const minusColor: string = "#CF304A";
const plusColor: string = "rgb(14, 203, 129)";

function Coin() {
  const [loaded, setLoaded] = useState(false);
  const { coinId } = useParams();
  const [info, setInfo] = useState<IInfodata>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  const [colorByNum, setColorByNum] = useState<string>("inherit");
  const [priceIcon, setPriceIcon] = useState<string>("fa-dash");
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      const price = priceData?.quotes.USD.percent_change_24h;
      if (typeof price == "number") {
        if (price > 0.05) {
          setColorByNum(plusColor);
          setPriceIcon("fa-caret-up");
        } else {
          setColorByNum(minusColor);
          setPriceIcon("fa-caret-down");
        }
        setLoaded(true);
      }
    })();
  }, [coinId]);

  return (
    <Container>
      <Title>{`${info?.name} (${info?.symbol})`}</Title>
      {loaded ? (
        <>
          <Content>
            <Text>{`$${priceWithComma(
              priceInfo?.quotes.USD.price.toFixed(2)
            )}`}</Text>
            <Text color={colorByNum}>
              <i className={`fa-solid ${priceIcon}`}></i>
              {` ${priceInfo?.quotes.USD.percent_change_24h}%`}
            </Text>
          </Content>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>공급량</span>
              <span>{`$ ${priceWithComma(
                priceInfo?.total_supply.toString()
              )}`}</span>
            </OverviewItem>
            <OverviewItem>
              <span>시가 총액</span>
              <span>
                {`$ ${priceWithComma(
                  priceInfo?.quotes.USD.market_cap.toString()
                )}`}
              </span>
            </OverviewItem>
          </Overview>
          <Discription>
            {info?.description === ""
              ? "자세한 설명이 존재하지 않는 암호화폐입니다."
              : info?.description}
          </Discription>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

export default Coin;
