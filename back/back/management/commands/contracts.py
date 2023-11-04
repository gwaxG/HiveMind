import os
from datetime import datetime, timedelta
from binance.client import Client
from django.core.management.base import BaseCommand
from back.serializers import make_contracts
from back.consts import BACKDAYS

class Command(BaseCommand):
    help = 'Just create Typescript contracts'

    def handle(self, *args, **options):
        make_contracts()

                

                
            



