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

export interface TodayPriceSerializer {
    id?: number;
    symbol: any;
    source: any;
    price: number;
}

