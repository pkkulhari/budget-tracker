from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class Transaction(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="transactions"
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    friends = models.ManyToManyField(User, related_name="accociated_friends")
    category = models.CharField(max_length=255)
    payer = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name="payer")
    date = models.DateField()

    class Meta:
        ordering = ["-date"]

    @property
    def splited_amount(self):
        return self.amount / self.friends.count()

    def __str__(self):
        return f"{self.user} - {self.amount}"
