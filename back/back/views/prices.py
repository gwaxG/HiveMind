from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from back.models import Price, Symbol, User
from back.consts import BACKDAYS
from back.serializers import PriceSerializer
from rest_framework import status
import uuid

class PricesView(APIView):

    def get(self, request, format=None):
        userid = request.session.get("userid")
        if userid is None:
            return Response(data={"error": "No user id."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        symbol_name = request.query_params['symbol']
        symbol = Symbol.objects.filter(name=symbol_name).first()
        start = datetime.utcnow() - timedelta(days=BACKDAYS+1)
        end = datetime.utcnow() - timedelta(days=1)
        
        prices = Price.objects.filter(date__range=(start.date(), end.date()), symbol=symbol)
        return Response(data=PriceSerializer(prices, many=True).data)
    
    def post(self, request, format="application/json"):
        serialized = [PriceSerializer(data=data) for data in request.data]

        valids = []
        for serializer in serialized:
            if serializer.is_valid():
                serializer.save()
                valids.append(True)
            else:
                valids.append(False)
            
        if all(valids):
            userid = request.session.get("userid")
            user = User.objects.get(userid=userid)
            user.lastsubmission = datetime.utcnow().isoformat()
            user.save()
            
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
