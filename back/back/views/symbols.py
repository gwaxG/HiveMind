from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from back.models import Symbol
from back.serializers import SymbolSerializer

class SymbolsView(APIView):

    def get(self, request, format=None):
        symbols = Symbol.objects.all()
        return Response(data=SymbolSerializer(symbols, many=True).data)