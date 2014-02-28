# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0015_auto_20140228_0153'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupnode',
            name='convoList',
            field=models.CharField(default='[]', max_length=1000),
        ),
    ]
