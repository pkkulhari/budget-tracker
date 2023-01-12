from rest_framework import serializers

from .models import Transaction
from users.serializers import UserSerializer


class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["user"] = UserSerializer(instance.user).data
        data["payer"] = UserSerializer(instance.payer).data
        data["friends"] = UserSerializer(instance.friends, many=True).data
        data["splited_amount"] = instance.splited_amount

        return data
