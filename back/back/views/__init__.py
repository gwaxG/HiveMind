from datetime import datetime, timedelta
from back.models import  Symbol, Source, OHLC
from back.consts import BACKDAYS, INTERVAL
from typing import List, Dict
from binance.client import Client
import os

client = Client(os.environ['BINANCEKEY'], os.environ['BINANCEKEY'])
cache_date = datetime.utcnow().date()
cache: Dict[str, List[OHLC]] = {}

def create_cache():
    source = Source.objects.get(name="Real")
    symbols = Symbol.objects.all()
    now = datetime.utcnow().date()
    start = now - timedelta(days=BACKDAYS+1)
    end = now - timedelta(days=1)

    for symbol in symbols:
        klines = client.get_historical_klines(
            symbol=symbol.name, 
            interval=INTERVAL, 
            start_str=start.isoformat(), 
            end_str=end.isoformat())
        cache[symbol.name] = []
        for i in range(BACKDAYS):
            date = now - timedelta(days=i+1)
            ohlc = OHLC(
                symbol=symbol, 
                source=source, 
                date=date, 
                open=klines[-i-1][1], 
                high=klines[-i-1][2], 
                low=klines[-i-1][3], 
                close=klines[-i-1][4])
            cache[symbol.name].append(ohlc)

def get_cache():
    global cache_date

    if cache_date != datetime.utcnow().date() - timedelta(days=1):
        create_cache()
        cache_date = datetime.utcnow().date() - timedelta(days=1)
    
    return cache

create_cache()
