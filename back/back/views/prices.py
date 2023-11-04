from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from back.models import Price, Symbol
from back.consts import BACKDAYS
from back.serializers import PriceSerializer

class PricesView(APIView):

    def get(self, request, format=None):
        symbol_name = request.query_params['symbol']
        symbol = Symbol.objects.filter(name=symbol_name).first()
        start = datetime.utcnow() - timedelta(days=BACKDAYS+1)
        end = datetime.utcnow() - timedelta(days=1)

        prices = Price.objects.filter(date__range=(start.date(), end.date()), symbol=symbol)
        return Response(data=Price(prices, many=True).data)
    
    def post(self, request, format):
        pass