# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0009_remove_groupnode_realgroup'),
    ]

    operations = [
        migrations.AddField(
            model_name='groupnode',
            name='realGroup',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
