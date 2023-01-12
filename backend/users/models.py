from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    friends = models.ManyToManyField(
        "self",
        blank=True,
    )

    def __str__(self):
        return self.username
