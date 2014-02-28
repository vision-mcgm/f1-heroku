# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0014_groupnode_convolist'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupnode',
            name='convoList',
            field=models.CharField(default='{[]}', max_length=1000),
        ),
    ]
