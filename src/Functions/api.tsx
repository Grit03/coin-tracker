const BASE_URL = "https://api.coinpaprika.com/v1";

export const getCoins = async () => {
  return (await fetch(`${BASE_URL}/coins`)).json();
};

export const getCoinInfo = async (coinId: string) => {
  return (await fetch(`${BASE_URL}/coins/${coinId}`)).json();
};

export const getCoinPrice = async (coinId: string) => {
  const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
  if (!response.ok) {
    return Promise.reject(new Error("fail"));
  } else {
    return response.json();
  }
};

export const getOhlcvByCoin = async (coinId: string) => {
  const response = await fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  );
  if (!response.ok) {
    return Promise.reject(new Error("fail"));
  } else {
    return response.json();
  }
};
