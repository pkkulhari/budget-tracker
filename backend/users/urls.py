from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView

from .views import UserViewSet, SignupView, MyTokenObtainPairView, FriendView

router = routers.DefaultRouter()
router.register(r"users", UserViewSet, basename="users")

urlpatterns = [
    path("users/<int:pk>/friends/", FriendView.as_view(), name="friends"),
    path("signup/", SignupView.as_view(), name="signup"),
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]

urlpatterns += router.urls
