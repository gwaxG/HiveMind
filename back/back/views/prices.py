from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from back.models import Price, Symbol, TodayPrice
from back.consts import BACKDAYS
from back.serializers import TodayPriceSerializer, PriceSerializer
import io
from rest_framework.parsers import JSONParser
from rest_framework import status

class PricesView(APIView):

    def get(self, request, format=None):
        symbol_name = request.query_params['symbol']
        symbol = Symbol.objects.filter(name=symbol_name).first()
        start = datetime.utcnow() - timedelta(days=BACKDAYS+1)
        end = datetime.utcnow() - timedelta(days=1)

        prices = Price.objects.filter(date__range=(start.date(), end.date()), symbol=symbol)
        return Response(data=PriceSerializer(prices, many=True).data)
    
    def post(self, request, format="application/json"):
        serializer = TodayPriceSerializer(data=request.data)

        if serializer.is_valid():
            price = serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)
