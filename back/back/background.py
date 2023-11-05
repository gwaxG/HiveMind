import logging
import os
from binance.client import Client
import numpy as np
import datetime
from django.db import connection
from apscheduler.schedulers.background import BackgroundScheduler
from back.models import Symbol, Source, TodayPrice, Price, SourceEnum


class Jobs:
    def __init__(self):
        self.start_time = "00:00"
        self.client = Client(os.environ['BINANCEKEY'], os.environ['BINANCEKEY'])
    
    def summarize_work_day(self):
        today = datetime.datetime.utcnow().date()
        try:
            symbols = Symbol.objects.all()
            stats_source = Source.objects.filter(name=SourceEnum.Statistics).first()
            human_source = Source.objects.filter(name=SourceEnum.Human).first()
            real_source = Source.objects.filter(name=SourceEnum.Real).first()

            for symbol in symbols:
                # Human
                human_mean = np.mean([price.price for price in TodayPrice.objects.filter(symbol=symbol, source=human_source)])
                Price.objects.create(symbol=symbol, source=human_source, price=human_mean, date=today)

                # Statistics
                stats_mean = np.mean([price.price for price in TodayPrice.objects.filter(symbol=symbol, source=stats_source)])
                Price.objects.create(symbol=symbol, source=stats_source, price=stats_mean, date=today)

                # Real
                # Close time of the last kline.
                last_kline_price = self.client.get_historical_klines(symbol=symbol.name, interval="1m", limit=1)[0][4]
                Price.objects.create(symbol=symbol, source=real_source, price=last_kline_price, date=today)

                logging.info(f"Day summary human: {human_mean}, statistics:{stats_mean}, real:{last_kline_price}.")

        except Exception as e:
            logging.error(f"An error occurred: {e} while creating summary")
        finally:
            connection.close()
    
    def run(self):
        h, m = 0, 0
        scheduler = BackgroundScheduler()
        scheduler.add_job(self.summarize_work_day, 'cron', hour=h, minute=m)
        scheduler.start()