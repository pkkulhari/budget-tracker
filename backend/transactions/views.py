from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Sum

from .models import Transaction
from .serializers import TransactionSerializer
from .filters import TransactionFilter


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = TransactionFilter

    def get_queryset(self):
        queryset = super().get_queryset()

        action = self.request.query_params.get("action", None)
        if action == "owes_you":
            queryset = queryset.exclude(payer=self.request.user)
            print(self.request.user)
        elif action == "you_owe":
            queryset = queryset.filter(payer=self.request.user)
        else:
            queryset = queryset.filter(user=self.request.user)

        return queryset


class SpentAmountView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, format=None):
        user = self.request.user

        spent_amount = 0
        # get the total amount spent by the user as a payer
        spent_amount += (
            Transaction.objects.filter(payer=user).aggregate(Sum("amount"))[
                "amount__sum"
            ]
            or 0
        )

        # get the total amount spent by the user as a friend who participated in bill splitting
        transactions = Transaction.objects.exclude(payer=user).filter(
            friends__in=[user]
        )
        spent_amount += sum(t.amount / t.friends.count() for t in transactions)

        return Response({"spentAmount": spent_amount})
