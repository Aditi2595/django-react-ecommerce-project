from django.db import migrations
from api.user.models import CustomUser

class Migration(migrations.Migration):
    def seed_data(apps, schema_editor):
        user = CustomUser(name="Aditi",
        email="adi.tewari2511@outlook.com",
        is_staff=True,
        is_superuser=True,
        phone="8923728290",
        gender="Female")

        user.set_password("success2023")
        user.save()

    dependencies = [
    ]

    operations = [
        migrations.RunPython(seed_data),
    ]