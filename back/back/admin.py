from django.contrib import admin
from back.models import Symbol, Price, OHLC

@admin.register(Symbol)
class SymbolAdmin(admin.ModelAdmin):
    list_display = ['name']  # Optional: to customize the admin list view


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'source', 'price', 'date']

@admin.register(OHLC)
class PriceAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'source', 'date', 'high', 'low', 'open', 'close']
