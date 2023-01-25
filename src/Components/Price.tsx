import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getCoinPrice } from "../Functions/api";
import { IColorByNum, IOutletCtx, IPriceData } from "../types/interfaces";
import { darkState } from "../atoms";
import Loading from "./Loading";
import styled from "styled-components";
import { priceWithComma } from "../Functions/dataPresenters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

const UnorderList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const DataList = styled.li`
  border: 2px solid ${(props) => props.theme.containerColor};
  text-align: center;
  width: 350px;
  padding: 15px 10px;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.containerColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 15px;
`;

const Highlight = styled.span<IColorByNum>`
  text-align: center;
  color: ${(props) => {
    if (props.colorByNum! === 0) {
      return props.theme.textColor;
    } else if (props.colorByNum! > 0) {
      return "rgb(14, 203, 129)";
    } else {
      return "#CF304A";
    }
  }};
  margin-left: 10px;
`;

const Text = styled.span`
  text-align: center;
  margin-left: 10px;
  color: ${(props) => props.theme.accentColor};
`;

function Price() {
  const { coinId } = useOutletContext<IOutletCtx>();
  const { isLoading, isError, data } = useQuery<IPriceData>({
    queryKey: [coinId, "coin-price"],
    queryFn: () => getCoinPrice(coinId!),
  });
  const isDark = useRecoilValue(darkState);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <span>Price Info Not Found</span>
      ) : (
        <UnorderList>
          <DataList>
            <span>현재 코인 순위</span>
            <Text>{data.rank}위</Text>
          </DataList>
          <DataList>
            <span>7일 전 보다</span>
            <Highlight colorByNum={data.quotes.USD.percent_change_24h}>
              {data.quotes.USD.percent_change_24h > 0 ? (
                <FontAwesomeIcon icon={faCaretUp} />
              ) : data.quotes.USD.percent_change_24h === 0 ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
              {` ${priceWithComma(
                JSON.stringify(data.quotes.USD.percent_change_24h)
              )} %`}
            </Highlight>
          </DataList>

          <DataList>
            <span>한달 전 보다</span>

            <Highlight colorByNum={data.quotes.USD.percent_change_30d}>
              {data.quotes.USD.percent_change_30d > 0 ? (
                <FontAwesomeIcon icon={faCaretUp} />
              ) : data.quotes.USD.percent_change_30d === 0 ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
              {` ${priceWithComma(
                JSON.stringify(data.quotes.USD.percent_change_30d)
              )} %`}
            </Highlight>
          </DataList>

          <DataList>
            <span>1년 전 보다</span>
            <Highlight colorByNum={data.quotes.USD.percent_change_1y}>
              {data.quotes.USD.percent_change_1y > 0 ? (
                <FontAwesomeIcon icon={faCaretUp} />
              ) : data.quotes.USD.percent_change_1y === 0 ? (
                <FontAwesomeIcon icon={faMinus} />
              ) : (
                <FontAwesomeIcon icon={faCaretDown} />
              )}
              {` ${priceWithComma(
                JSON.stringify(data.quotes.USD.percent_change_1y)
              )} %`}
            </Highlight>
          </DataList>

          <DataList>
            <span>최고가</span>
            <Text>
              {priceWithComma(JSON.stringify(data.quotes.USD.ath_price))} $
            </Text>
          </DataList>
        </UnorderList>
      )}
    </>
  );
}

export default Price;
