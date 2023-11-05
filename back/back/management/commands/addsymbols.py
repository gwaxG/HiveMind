from django.core.management.base import BaseCommand, CommandError
from back.models import Symbol, Source, SourceEnum

SYMBOLS = [
    "BTCUSDT",
    "ETHUSDT",
    "DOGEUSDT",
    "PEPEUSDT",
    "FTMUSDT"
]

class Command(BaseCommand):
    help = 'Used to update database symbols and sources'

    def handle(self, *args, **options):
        for symbol in SYMBOLS:
            if not Symbol.objects.filter(name=symbol).exists():
                Symbol.objects.create(name=symbol)
                self.stdout.write(f"Added symbol {symbol}")

        for source in dir(SourceEnum):
            if not source.startswith('__') and not Source.objects.filter(name=source).exists():
                Source.objects.create(name=source)
                self.stdout.write(f"Added source {symbol}")
        

        

    