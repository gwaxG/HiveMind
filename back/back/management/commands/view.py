import os
from datetime import datetime, timedelta
from binance.client import Client
from django.core.management.base import BaseCommand
from back.models import Symbol, Source, SourceEnum, Price
from back.consts import BACKDAYS

class Command(BaseCommand):
    help = 'Just a db checker'

    def handle(self, *args, **options):
        backdays = BACKDAYS
        client = Client(os.environ['BINANCEKEY'], os.environ['BINANCEKEY'])
        
        prices = Price.objects.all()

        for pr in prices:
            print(pr)

                

                
            



