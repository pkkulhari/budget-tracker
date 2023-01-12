from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()


urlpatterns = [
    path("", include("users.urls")),
    path("", include("transactions.urls")),
]
