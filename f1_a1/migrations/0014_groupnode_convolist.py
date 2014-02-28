# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0013_groupnode_people'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupnode',
            name='convoList',
            field=models.CharField(default=0, max_length=1000),
            preserve_default=True,
        ),
    ]
