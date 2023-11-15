import time
from django.core.management.base import BaseCommand
from back.models import Symbol, Source, SourceEnum, OHLC
import random
from datetime import datetime, timedelta
import os
from back.consts import BACKDAYS

class Command(BaseCommand):
    help = 'Used to generate artificial prices'

    def handle(self, *args, **options):
        human_source = Source.objects.filter(name=SourceEnum.Human).first()
        real_source = Source.objects.filter(name=SourceEnum.Real).first()

        prices = []
        now = datetime.utcnow().date()

        for symbol in Symbol.objects.all():
            
            base_price = random.random() * 100

            for i in range(30):
                date = now - timedelta(days=i)
                prices.append(OHLC(symbol=symbol, source=human_source, date=date,
                                   high=base_price + random.random() * 10,
                                   low=base_price + random.random() * 10,
                                   open=base_price + random.random() * 10,
                                   close=base_price + random.random() * 10))
                prices.append(OHLC(symbol=symbol, source=real_source, date=date,
                                   high=base_price + random.random() * 5,
                                   low=base_price + random.random() * 5,
                                   open=base_price + random.random() * 5,
                                   close=base_price + random.random() * 5))
            
        OHLC.objects.bulk_create(prices)
