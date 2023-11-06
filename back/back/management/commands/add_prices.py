import time
from django.core.management.base import BaseCommand
from back.models import Symbol, Source, SourceEnum, Price, TodayPrice
import random
from datetime import datetime, timedelta
import os
from back.consts import BACKDAYS

class Command(BaseCommand):
    help = 'Used to generate artificial prices'

    def handle(self, *args, **options):
        while True:
            stats_source = Source.objects.filter(name=SourceEnum.Statistics).first()
            human_source = Source.objects.filter(name=SourceEnum.Human).first()
            date = datetime.utcnow().date()

            for symbol in Symbol.objects.all():
                prices = []
                base_price = random.random() * 100

                for i in range(10):
                    prices.append(Price(symbol=symbol, source=stats_source, price=base_price + random.random() * 10))
                    prices.append(Price(symbol=symbol, source=human_source, price=base_price + random.random() * 10))
                
                TodayPrice.objects.bulk_create(prices)
