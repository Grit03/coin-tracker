import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { getOhlcvByCoin } from "../Functions/api";
import { IOhlcv, IOutletCtx } from "../types/interfaces";
import Loading from "../Components/Loading";
import ApexChart from "react-apexcharts";
import { darkState } from "../atoms";
import { useRecoilValue } from "recoil";
import { useMediaQuery } from "react-responsive";

function Chart() {
  const { coinId } = useOutletContext<IOutletCtx>();
  const { isLoading, isError, data } = useQuery<IOhlcv[]>({
    queryKey: [coinId, "ohlcv"],
    queryFn: () => getOhlcvByCoin(coinId),
  });
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });
  const isDark = useRecoilValue(darkState);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <span>Chart Info Not Found</span>
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
              mode: isDark ? "dark" : "light",
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
          width={isMobile ? 320 : 630}
          type="candlestick"
        />
      )}
    </>
  );
}

export default Chart;
