from django.contrib import admin
from back.models import Symbol, TodayPrice, Price

@admin.register(Symbol)
class SymbolAdmin(admin.ModelAdmin):
    list_display = ['name']  # Optional: to customize the admin list view


@admin.register(TodayPrice)
class TodayPriceAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'source', 'price']


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'source', 'price', 'date']
