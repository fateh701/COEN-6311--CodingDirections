from typing import Tuple
from django.contrib.auth import get_user_model,authenticate
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()     #will be User model of AuthenticationBackend.models
        fields = ['email','username','password','first_name','last_name']
        extra_kwargs = {'password':{'write_only':True,'min_length':8}} #password is write only and min length is 8

    def create(self, validated_data):
        return get_user_model().objects.create_user(**validated_data) #create_user is a method in CustomUserManager of AuthenticationBackend.models

    def update(self, instance, validated_data):
        password = validated_data.pop('password',None)
        user = super().update(instance,validated_data)
        if password:
            user.set_password(password)
            user.save()
        return user


class AuthTokenSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type':'password'},
        trim_whitespace=False
    )

    def validate(self,attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = 'Unable to authenticate with provided credentials'
            raise serializers.ValidationError(msg,code='authentication')
        attrs['user'] = user
        return attrs