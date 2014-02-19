from django.db import models
import datetime
from django.utils import timezone
from uuid import uuid4

class Poll(models.Model):
    question = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')
    def __unicode__(self):
     return self.question
    def was_published_recently(self):
     return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    was_published_recently.short_description = 'Published recently?'

class Choice(models.Model):
    poll = models.ForeignKey(Poll)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)
    def __unicode__(self):
     return self.choice_text

class WallPost(models.Model):
    text=models.CharField(max_length=1000)



    def __unicode__(self):
        return self.text



class Person(models.Model):
    handle=models.CharField(max_length=1000)
    name=models.CharField(max_length=1000)
    email=models.EmailField(max_length=128)
    uid=models.IntegerField(default=0)
   # uid2=models.IntegerField(default=0)

    def __unicode__(self):
        return self.name


class Conversation(models.Model):
    uid=models.IntegerField()
   # text=models.CharField(max_length=1000)
    convoID=models.CharField(max_length=100, blank=True, unique=True, default=uuid4)
    #So that uuid is reevaluated every time



class ProtoConversation(models.Model):
    wallHandle=models.ForeignKey(Person)



class Message(models.Model):
    #Author numerical ID
    uid=models.IntegerField(default=0)
    text=models.CharField(max_length=1000)
    handle=models.CharField(max_length=1000)
    name=models.CharField(max_length=1000)
    test=models.CharField(max_length=1000,default=0)
  # pConvo=models.ForeignKey(Conversation,default=1)
   # pMessage=models.ForeignKey('Message',null=True, blank=True) #Unused for now
    parentID=models.IntegerField(default=0)
    convoID=models.IntegerField(default=0)



class Audience(models.Model):
    pass

class Closure(models.Model):
    pass

class Group(models.Model):
    pass

class Event(models.Model):
    pass