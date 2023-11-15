from django.db import models

class SourceEnum:
    Human = 'Human'
    Real = 'Real'

class Symbol(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class User(models.Model):
    userid = models.CharField(max_length=30, primary_key=True)
    lastsubmission = models.DateTimeField(null=True)

    def __str__(self):
        return f"{self.userid}, last submitted at {self.lastsubmission}"

class Source(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Price(models.Model):
    symbol = models.ForeignKey(Symbol, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)
    price = models.FloatField()
    date = models.DateField()
    
    def __str__(self):
        return f"{self.symbol}, {self.source}, {self.price}, {self.date}"

