import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import Loading from "../Components/Loading";
import { getCoinInfo, getCoinPrice } from "../Functions/api";
import { priceWithComma } from "../Functions/dataPresenters";
import { IInfodata, IPriceData } from "../types/apiDataTypes";

// interfaces
interface IColorByNum {
  colorByNum?: number;
}

// styled-components
const Container = styled.section`
  margin-top: 11vh;
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

const Text = styled.div<IColorByNum>`
  text-align: center;
  color: ${(props) => {
    if (props.colorByNum! > 0.05) {
      return "rgb(14, 203, 129)";
    } else {
      return "#CF304A";
    }
  }};
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  width: 55%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  min-width: 300px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  background-color: ${(props) =>
    props.isActive ? props.theme.containerColor : "rgba(0, 0, 0, 0.5)"};
  a {
    padding: 10px 0px;
    display: block;
  }
`;

function Coin() {
  const { coinId } = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: coinInfo } = useQuery<IInfodata>({
    queryKey: [coinId, "coin-info"],
    queryFn: () => getCoinInfo(coinId!),
  });
  const { isLoading: priceLoading, data: coinPrice } = useQuery<IPriceData>({
    queryKey: [coinId, "coin-price"],
    queryFn: () => getCoinPrice(coinId!),
  });

  return (
    <Container>
      <Title>
        {state
          ? `${state.name} (${state.symbol})`
          : infoLoading
          ? "Loading..."
          : `${coinInfo?.name} (${coinInfo?.symbol})`}
      </Title>
      {priceLoading ? (
        <Loading />
      ) : (
        <>
          <Content>
            <Text>{`$${priceWithComma(
              coinPrice?.quotes.USD.price.toFixed(2)
            )}`}</Text>
            <Text colorByNum={coinPrice!.quotes.USD.percent_change_24h}>
              {coinPrice!.quotes.USD.percent_change_24h > 0.05 ? (
                <i className={"fa-solid fa-caret-up"}></i>
              ) : (
                <i className={"fa-solid fa-caret-down"}></i>
              )}
              {` ${coinPrice?.quotes.USD.percent_change_24h}%`}
            </Text>
          </Content>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{coinInfo?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>공급량</span>
              <span>{`$ ${priceWithComma(
                coinPrice?.total_supply.toString()
              )}`}</span>
            </OverviewItem>
            <OverviewItem>
              <span>시가 총액</span>
              <span>
                {`$ ${priceWithComma(
                  coinPrice?.quotes.USD.market_cap.toString()
                )}`}
              </span>
            </OverviewItem>
          </Overview>
          <Discription>
            {coinInfo?.description === ""
              ? "자세한 설명이 존재하지 않는 암호화폐입니다."
              : coinInfo?.description}
          </Discription>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
        </>
      )}
      <Outlet />
    </Container>
  );
}

export default Coin;
