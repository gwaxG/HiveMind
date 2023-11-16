import datetime
from rest_framework import serializers
from back.models import Symbol, Price, Source, OHLC
from django_typomatic import ts_interface
from django_typomatic import ts_interface, generate_ts

@ts_interface()
class SymbolSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Symbol
        fields = ['name']

@ts_interface()
class PriceSerializer(serializers.ModelSerializer):
    
    symbol = serializers.SlugRelatedField(
        many=False,
        queryset=Symbol.objects.all(),
        slug_field='name'
    )

    price = serializers.FloatField()

    source = serializers.SlugRelatedField(
        many=False,
        queryset=Source.objects.all(),
        slug_field='name'
    )

    def create(self, validated_data):
        validated_data["date"] = datetime.datetime.utcnow().date()
        return Price.objects.create(**validated_data)

    class Meta:
        model = Price
        fields = ['symbol', 'source', 'price']

@ts_interface()
class OHLCSerializer(serializers.ModelSerializer):
    
    symbol = serializers.SlugRelatedField(
        many=False,
        queryset=Symbol.objects.all(),
        slug_field='name'
    )

    source = serializers.SlugRelatedField(
        many=False,
        queryset=Source.objects.all(),
        slug_field='name'
    )

    class Meta:
        model = OHLC
        fields = ['symbol', 'source', 'date', 'open', 'high', 'low', 'close']

def make_contracts():
    generate_ts('./../front/src/app/contracts/contracts.ts', camelize=True)