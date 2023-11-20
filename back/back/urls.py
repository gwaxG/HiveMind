from django.urls import path, include
from back.views.symbols import SymbolsView
from back.views.prices import PricesView
from django.contrib import admin

urlpatterns = [
    path("api/symbols/", SymbolsView.as_view(), name='symbols'),
    path('api/prices/', PricesView.as_view(), name='prices'),
    path("api/admin/", admin.site.urls),
]
