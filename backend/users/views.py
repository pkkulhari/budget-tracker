from rest_framework import viewsets, generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .serializers import UserSerializer, SignupSerializer, MyTokenObtainPairSerializer

User = get_user_model()


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = User.objects.filter(is_superuser=False)

        action = self.request.query_params.get("action", None)
        if action == "exclude_friends":
            current_user = self.request.user
            queryset = queryset.exclude(id=current_user.id)
            queryset = queryset.exclude(id__in=current_user.friends.all())

        return queryset


class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class FriendView(APIView):
    def get(self, request, pk):
        user = User.objects.get(id=pk)
        sserializer = UserSerializer(user.friends, many=True)

        return Response(sserializer.data)

    def post(self, request, pk):
        user = User.objects.get(id=pk)
        friend = request.data.get("friend", None)
        user.friends.add(friend)

        return Response(status=status.HTTP_201_CREATED)

    def delete(self, request, pk):
        user = User.objects.get(id=pk)
        friend = request.data.get("friend", None)
        user.friends.remove(friend)

        return Response(status=status.HTTP_204_NO_CONTENT)
