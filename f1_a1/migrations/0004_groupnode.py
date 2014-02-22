# encoding: utf8
from django.db import models, migrations


class Migration(migrations.Migration):
    
    dependencies = [
        ('f1_a1', '0003_delete_groupnode'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupNode',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('uid', models.IntegerField(default=0)),
                ('person', models.CharField(max_length=1000)),
                ('parentID', models.IntegerField(default=0)),
                ('convoID', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
