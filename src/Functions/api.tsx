export const getCoins = async () => {
  return (await fetch("https://api.coinpaprika.com/v1/coins")).json();
};

export const getCoinInfo = async (coinId: string) => {
  return (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
};

export const getCoinPrice = async (coinId: string) => {
  return (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
};
