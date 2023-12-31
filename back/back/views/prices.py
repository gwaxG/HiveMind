from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from back.models import Price, Symbol, Source, User, OHLC
from back.consts import BACKDAYS, INTERVAL
from back.serializers import PriceSerializer, OHLCSerializer
from rest_framework import status
from . import get_cache

class PricesView(APIView):
    def get(self, request, format=None):
        cache = get_cache()

        userid = request.session.get("userid")
        if userid is None:
            return Response(data={"error": "No user id."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        symbol_name = request.query_params['symbol']
        symbol = Symbol.objects.filter(name=symbol_name).first()
        start = datetime.utcnow() - timedelta(days=BACKDAYS+1)
        end = datetime.utcnow() - timedelta(days=1)
        
        prices = OHLC.objects.filter(date__range=(start.date(), end.date()), symbol=symbol)
        prices = list(prices) + cache[symbol_name]

        return Response(data=OHLCSerializer(prices, many=True).data)
    
    def update_ohlc(self, data: dict):
        date = datetime.utcnow().date()
        symbol = Symbol.objects.filter(name=data["symbol"]).first()
        source = Source.objects.filter(name=data["source"]).first()
        price = data["price"]

        filtered = OHLC.objects.filter(date=date, symbol=symbol, source=source)
        if not filtered.exists():
            OHLC.objects.create(symbol=symbol, source=source, date=date+timedelta(days=1), open=price, close=price, high=price, low=price)
        else:
            f = filtered.first()
            if price > f.high:
                f.high = price
            elif price < f.low:
                f.low = price
            f.close = price
            f.save()

    def post(self, request, format="application/json"):
        serializer = PriceSerializer(data=request.data)

        if serializer.is_valid():
            self.update_ohlc(serializer.validated_data)
            serializer.save()
            userid = request.session.get("userid")
            user = User.objects.get(userid=userid)
            user.lastsubmission = datetime.utcnow().isoformat()
            user.save()
            
            return Response(status=status.HTTP_201_CREATED)
        else:
             return Response(status=status.HTTP_400_BAD_REQUEST)
