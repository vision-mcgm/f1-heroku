# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupnode',
            name='convoID',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
