from binance.client import Client
from django.core.management.base import BaseCommand
from back.models import Symbol, Source, SourcesEnum, Price
from datetime import datetime, timedelta
import os
from back.consts import BACKDAYS

class Command(BaseCommand):
    help = 'Used to fill real prices for existing symbols in database'

    def handle(self, *args, **options):
        client = Client(os.environ['BINANCEKEY'], os.environ['BINANCEKEY'])
        
        source = Source.objects.filter(name=SourcesEnum.Real).first()

        now = datetime.utcnow().date()
        start = now - timedelta(days=BACKDAYS+1)
        end = now - timedelta(days=1)

        for symbol in Symbol.objects.all():
            stored_prices = Price.objects.filter(date__range=(start, end), symbol=symbol).all()
            
            if stored_prices.count() != BACKDAYS:
                prices = []
                klines = client.get_historical_klines(symbol=symbol.name, interval="1d", start_str=start.isoformat(), end_str=end.isoformat())
                close_prices = [kline[4] for kline in klines]
                for i in range(BACKDAYS):
                    dat = now - timedelta(days=i+1)
                    if not Price.objects.filter(date=dat, symbol=symbol).exists():
                        prices.append(Price(symbol=symbol, source=source, price=close_prices[-i-1], date=dat))
                Price.objects.bulk_create(prices)
                

                
            



