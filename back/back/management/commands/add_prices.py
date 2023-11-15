import time
from django.core.management.base import BaseCommand
from back.models import Symbol, Source, SourceEnum, Price
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
                prices.append(Price(symbol=symbol, source=human_source, price=base_price + random.random() * 10,date=date))
                prices.append(Price(symbol=symbol, source=real_source, price=base_price + random.random() * 10,date=date))
            
        Price.objects.bulk_create(prices)
