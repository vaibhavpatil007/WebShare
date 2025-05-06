from rest_framework import serializers
from .models import * 

class SharedEndpointserializer(serializers.ModelSerializer):
    class Meta:
        model = SharedEndpoint
        fields = ["id","slug","created_at"]

class SharedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = SharedFile
        fields = ["id","file","uploaded_at","ip_address"]