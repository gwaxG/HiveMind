from rest_framework import serializers
from back.models import Symbol, Price, Source, TodayPrice
from django_typomatic import ts_interface
from django_typomatic import ts_interface, generate_ts

@ts_interface()
class SymbolSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Symbol
        fields = '__all__'

@ts_interface()
class PriceSerializer(serializers.ModelSerializer):
    
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
        model = Price
        fields = '__all__'

@ts_interface()
class TodayPriceSerializer(serializers.ModelSerializer):
    
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

    def update(self, instance, validated_data):
        symbol = Symbol.objects.filter(name=validated_data.get('symbol', instance.symbol)).first()
        source = Source.objects.filter(name=validated_data.get('source', instance.source)).first()
        
        instance.symbol = symbol
        instance.source = source
        instance.price = validated_data.get('price', instance.price)
        
        instance.save()

        return instance

    class Meta:
        model = TodayPrice
        fields = '__all__'

def make_contracts():
    generate_ts('./../front/src/app/contracts/contracts.ts', camelize=True)