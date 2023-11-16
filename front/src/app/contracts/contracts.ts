export interface Symbol {
    name: string;
}

export interface Price {
    symbol: string;
    source: string;
    price: number;
}

export interface OHLC {
    symbol: string;
    source: string;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

