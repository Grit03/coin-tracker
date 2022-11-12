const BASE_URL = "https://api.coinpaprika.com/v1";

export const getCoins = async () => {
  return (await fetch(`${BASE_URL}/coins`)).json();
};

export const getCoinInfo = async (coinId: string) => {
  return (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
};

export const getCoinPrice = async (coinId: string) => {
  return (await fetch(`${BASE_URL}/tickers/${coinId}`)).json();
};

export const getOhlcvByCoin = async (coinId: string) => {
  return (
    await fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`)
  ).json();
};
