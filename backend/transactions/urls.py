from rest_framework import routers
from django.urls import path

from .views import TransactionViewSet, SpentAmountView

router = routers.DefaultRouter()
router.register(r"transactions", TransactionViewSet, basename="transactions")

urlpatterns = [
    path("transactions/spent-amount/", SpentAmountView.as_view(), name="spent-amount"),
]

urlpatterns += router.urls
