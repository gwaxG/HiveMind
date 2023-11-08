from django.urls import path
from back.views.symbols import SymbolsView
from back.views.prices import PricesView
from back.views.status import StatusView
from django.contrib import admin

urlpatterns = [
    path('symbols/', SymbolsView.as_view(), name='symbols'),
    path('prices/', PricesView.as_view(), name='prices'),
    path('status/', StatusView.as_view(), name='status'),
    path("admin/", admin.site.urls),
]