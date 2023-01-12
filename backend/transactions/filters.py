from django_filters import rest_framework as filters

from .models import Transaction


class TransactionFilter(filters.FilterSet):
    class Meta:
        model = Transaction
        fields = {
            "user": ["exact"],
            "category": ["exact"],
            "payer": ["exact"],
            "date": ["exact", "lt", "gt"],
            "friends": ["exact"],
        }
