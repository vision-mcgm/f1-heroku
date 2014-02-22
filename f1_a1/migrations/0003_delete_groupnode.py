# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0002_groupnode_convoid'),
    ]

    operations = [
        migrations.DeleteModel(
            name='GroupNode',
        ),
    ]
