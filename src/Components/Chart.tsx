import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { getOhlcvByCoin } from "../Functions/api";
import { IOhlcv } from "../types/apiDataTypes";
import Loading from "../Components/Loading";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

// interfaces
interface IOutletCtx {
  coinId: string;
}

function Chart() {
  const { coinId } = useOutletContext<IOutletCtx>();
  const { isLoading, data } = useQuery<IOhlcv[]>({
    queryKey: [coinId, "ohlcv"],
    queryFn: () => getOhlcvByCoin(coinId),
  });
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <ApexChart
          series={[
            {
              name: "price",
              data: data!.map((coinPrice) => {
                return {
                  x: new Date(coinPrice.time_close * 1000).toUTCString(),
                  y: [
                    coinPrice.open,
                    coinPrice.high,
                    coinPrice.low,
                    coinPrice.close,
                  ],
                };
              }),
            },
          ]}
          options={{
            chart: {
              background: "transparent",
            },
            theme: {
              mode: "dark",
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
          width={700}
          type="candlestick"
        />
      )}
    </>
  );
}

export default Chart;
