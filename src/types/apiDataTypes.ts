export interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

export interface IInfodata {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  isNew: boolean;
  isActive: boolean;
  type: string;
  contract: string;
  platform: string;
  contracts: Contract[];
  logo: string;
  parent: Parent;
  tags: null;
  team: any[];
  description: string;
  message: null;
  openSource: boolean;
  startedAt: null;
  developmentStatus: null;
  hardwareWallet: boolean;
  proofType: null;
  orgStructure: null;
  hashAlgorithm: null;
  links: Links;
  linksExtended: any[];
  whitepaper: Whitepaper;
  firstDataAt: Date;
  lastDataAt: Date;
}

export interface Contract {
  contract: string;
  platform: string;
  type: string;
}

export interface Links {}

export interface Parent {
  id: string;
  name: string;
  symbol: string;
}

export interface Whitepaper {
  link: null;
  thumbnail: null;
}
export interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: { [key: string]: Quote };
}

export interface Quote {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number | null;
  ath_date: Date | null;
  percent_from_price_ath: number | null;
}

// ohlcv data interface
export interface IOhlcv {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}
