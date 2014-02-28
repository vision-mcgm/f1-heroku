# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0004_groupnode'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupnode',
            name='realGroup',
            field=models.BooleanField(default=0),
            preserve_default=True,
        ),
    ]
