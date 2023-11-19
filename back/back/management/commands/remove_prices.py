from django.core.management.base import BaseCommand
from back.models import Price, OHLC

class Command(BaseCommand):
    help = 'Used to generate artificial prices'

    def handle(self, *args, **options):
        OHLC.objects.all().delete()
        Price.objects.all().delete()
        print("Done!")
