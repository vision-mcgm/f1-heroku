# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0010_groupnode_realgroup'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupnode',
            name='groupName',
        ),
    ]
