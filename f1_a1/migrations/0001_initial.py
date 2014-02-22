# encoding: utf8
from django.db import models, migrations
import uuid


class Migration(migrations.Migration):
    
    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Person',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('handle', models.CharField(max_length=1000)),
                ('name', models.CharField(max_length=1000)),
                ('email', models.EmailField(max_length=128)),
                ('uid', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Audience',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Conversation',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('uid', models.IntegerField()),
                ('convoID', models.CharField(default=uuid.uuid4, unique=True, max_length=100, blank=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Closure',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='WallPost',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=1000)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='GroupNode',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('uid', models.IntegerField(default=0)),
                ('person', models.CharField(max_length=1000)),
                ('parentID', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('uid', models.IntegerField(default=0)),
                ('text', models.CharField(max_length=1000)),
                ('handle', models.CharField(max_length=1000)),
                ('name', models.CharField(max_length=1000)),
                ('test', models.CharField(default=0, max_length=1000)),
                ('parentID', models.IntegerField(default=0)),
                ('convoID', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('question', models.CharField(max_length=200)),
                ('pub_date', models.DateTimeField(verbose_name='date published')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('poll', models.ForeignKey(to='f1_a1.Poll', to_field=u'id')),
                ('choice_text', models.CharField(max_length=200)),
                ('votes', models.IntegerField(default=0)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ProtoConversation',
            fields=[
                (u'id', models.AutoField(verbose_name=u'ID', serialize=False, auto_created=True, primary_key=True)),
                ('wallHandle', models.ForeignKey(to='f1_a1.Person', to_field=u'id')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
