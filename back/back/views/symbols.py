from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from back.models import Symbol
from back.serializers import SymbolSerializer
from django.conf import settings

class SymbolsView(APIView):

    def get(self, request, format=None):
        request.session['init'] = 'true'
        if request.session.get("userid") is None:
            request.session["userid"]
        
        request.session.save()  # Force save the session
        print("session key", request.session._session_key)
        symbols = Symbol.objects.all()
        return Response(data=SymbolSerializer(symbols, many=True).data)