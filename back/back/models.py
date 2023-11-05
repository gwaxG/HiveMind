from django.db import models

"""
Table: Symbols:
    a. Symbols

Table: Historical prices:
    a. Symbol
    b. Mean human-based opinion | float
    c. Market actual price from excahnge | float
    d. Depth market-based deduced price | float
    e. Date

! Processing is triggered once a day mean value is calculated, tables cleaned, calculated data is written to historical prices.
Table: data acquisition:
    a. Symbol
    b. human-based opinion | float
    c. market-based opinion | float
"""

class SourceEnum:
    Human = 'Human'
    Real = 'Real'
    Statistics = 'Statistics'

class Symbol(models.Model):
    name = models.CharField(max_length=30)

class Source(models.Model):
    name = models.CharField(max_length=30)

class TodayPrice(models.Model):
    symbol = models.ForeignKey(Symbol, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    price = models.FloatField()

class Price(models.Model):
    symbol = models.ForeignKey(Symbol, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    price = models.FloatField()
    date = models.DateField()

