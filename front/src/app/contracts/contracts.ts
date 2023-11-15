export interface SymbolSerializer {
    id?: number;
    name: string;
}

export interface PriceSerializer {
    id?: number;
    symbol: any;
    source: any;
    price: number;
    date: string;
}

export interface OHLCSerializer {
    id?: number;
    symbol: any;
    source: any;
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

