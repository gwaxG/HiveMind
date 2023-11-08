from datetime import datetime, timedelta
from rest_framework.views import APIView
from rest_framework.response import Response
from back.models import Price, Symbol, TodayPrice
from back.consts import BACKDAYS
from back.serializers import TodayPriceSerializer, PriceSerializer
import io
from rest_framework.parsers import JSONParser
from rest_framework import status
from back.models import User

class StatusView(APIView):

    def get(self, request, format=None):
        userid = request.COOKIES["userid"]
        user = User.objects.get(userid=userid)
        
        submitted = user.lastsubmission is not None and user.lastsubmission.date() == datetime.utcnow().date()

        return Response(data={
            "submitted": submitted
        })

