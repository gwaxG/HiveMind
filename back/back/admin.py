from django.contrib import admin
from back.models import Symbol, Price

@admin.register(Symbol)
class SymbolAdmin(admin.ModelAdmin):
    list_display = ['name']  # Optional: to customize the admin list view


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'source', 'price', 'date']
