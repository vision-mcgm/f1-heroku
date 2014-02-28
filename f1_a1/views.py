from django.contrib.auth import authenticate,logout
from django.contrib.auth import login as auth_login
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext, loader,Context
from f1_a1.models import Poll,WallPost,Person,Message,Conversation,GroupNode
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from json import dumps,loads
import logging

log = logging.getLogger(__name__)

#HTTP real page view requests

def index(request):
    latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('f1_a1/index.html')
    context = RequestContext(request, {
        'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))

def post(request):
	if request.user.is_authenticated():
		me=Person.objects.get(uid=request.user.id)

		template = loader.get_template('f1_a1/post.html')
		context = RequestContext(request, {'me':me})
		return HttpResponse(template.render(context))

	else:
		return HttpResponse('Not authenticated.')


def wall(request):
	if request.user.is_authenticated():
		logger = logging.getLogger(__name__)
		logger.error('Starting wall view')
		posts=WallPost.objects.all()
		template = loader.get_template('f1_a1/wall.html')
		c=RequestContext(request,{'posts':posts})
		return HttpResponse(template.render(c))
	else:
		return HttpResponse("You are not logged in!")

def wallpost(request):
	thetext=request.POST['text']
	wp=WallPost(text=thetext)
	wp.save()
	return HttpResponseRedirect(reverse('f1_a1:wall', ))

def news(request):
	if request.user.is_authenticated():
		me=Person.objects.get(uid=request.user.id)
		template = loader.get_template('f1_a1/news.html')
		context = RequestContext(request, {'me':me})
		return HttpResponse(template.render(context))

def groups(request):
	me=Person.objects.get(uid=request.user.id)
	template = loader.get_template('f1_a1/groups.html')
	context = RequestContext(request, {'me':me})
	return HttpResponse(template.render(context))


def profiles(request):
	if request.user.is_authenticated():
		me=Person.objects.get(uid=request.user.id)
		template = loader.get_template('f1_a1/profiles.html')
		context = RequestContext(request, {'me':me})
		return HttpResponse(template.render(context))

def options(request):
	if request.user.is_authenticated():
		me=Person.objects.get(uid=request.user.id)
		template = loader.get_template('f1_a1/options.html')
		context = RequestContext(request, {'me':me})
		return HttpResponse(template.render(context))

def welcome(request):
	
	template = loader.get_template('f1_a1/welcome.html')
	if request.user.is_authenticated():
		me=Person.objects.get(uid=request.user.id)
		context = RequestContext(request, {'me':me})
	else:
		context = RequestContext(request, {})
	return HttpResponse(template.render(context))


def home(request):
	if request.user.is_authenticated():
		template = loader.get_template('f1_a1/home.html')
		context = RequestContext(request,{})
		return HttpResponse(template.render(context))
	else:
		return HttpResponseRedirect('/welcome')



def login(request):
	username = request.POST['handle']
	password = request.POST['password']
	user = authenticate(username=username, password=password)
	if user is not None:
		if user.is_active:
			auth_login(request, user)
			return HttpResponseRedirect('home')
		else:
			return HttpResponse("Problem logging in")
	else:
		return HttpResponse("Problem authenticating")

def join(request):
	handle = request.REQUEST.get('handle', None)
	userPass = request.REQUEST.get('password', None)
	userMail = request.REQUEST.get('email', None)
	name = request.REQUEST.get('name', None)
	user = User.objects.create_user(handle, userMail, userPass)
	user.save()
	p=Person(handle=handle,email=userMail,name=name,uid=user.id)
	p.save()
	return HttpResponse("User created")
   

def person(request,id):
	if request.user.is_authenticated():
		me=Person.objects.get(uid=request.user.id)
		if Person.objects.filter(handle=id).count():
			person=Person.objects.get(handle=id)
			template = loader.get_template('f1_a1/person.html')
			context = RequestContext(request, {'person':person,'me':me})
			return HttpResponse(template.render(context))
		else:
			return HttpResponse('No person by that name: '+id)
	else:
		return HttpResponse('Not authenticated.')

def message(request):
	return HttpResponse('This is a message!')

#AJAX GET requests

def addToGroup(request):
	if request.user.is_authenticated():
		g=GroupNode.objects.get(uid=request.user.id,groupName=request.GET['groupName'])
		log.error(g)
		jPeople=g.people
		pPeople=loads(jPeople)
		log.error('c '+str(pPeople)+str(type(pPeople)))
		if pPeople==0:
			log.error('NULL')
			pPeople=[request.GET['handleToAdd']]
		else:
			pPeople.append(request.GET['handleToAdd'])
		jPeople=dumps(pPeople)
		g.people=jPeople
		g.save()
		return HttpResponse(1)

def newGroup(request):
	if request.user.is_authenticated():
		g=GroupNode(uid=request.user.id,parentID=0,groupName=request.GET['groupName'],realGroup=True)
		g.save()
		return HttpResponse(1)

def getGroups(request):
	if request.user.is_authenticated():
		#Get convos
		groups=GroupNode.objects.filter(uid=request.user.id)	
		jGroups=[]
		for g in groups:

			jGroups.append({'person':g.person,'parentID':g.parentID,'realGroup':g.realGroup,'groupName':g.groupName})
		#return HttpResponse(dumps(jGroups))
		return HttpResponse(dumps(jGroups))


def getShortGroupList(request):
	if request.user.is_authenticated():
		#Get convos
		groups=GroupNode.objects.filter(uid=request.user.id)	
		jGroups=[]
		for g in groups:
			
			if g.realGroup:
				jGroups.append({'groupName':g.groupName})
		#return HttpResponse(dumps(jGroups))
		return HttpResponse(dumps(jGroups))


def getMessagesByUID(request):
	#GET request by Ajax
	if request.user.is_authenticated():
		uid=request.user.id
		#Get convos
		convos=Conversation.objects.filter(uid=uid)	
		jConvos=[]
		for c in convos:
			messages=Message.objects.filter(convoID=c.id)
			log.error(str(c.id)+'Posting message')
			jMsgs=[]
			for m in messages:
				jMsgs.append({'text':m.text,'name':m.name,'id':m.id,
					'handle':m.handle,'parent':m.parentID})
			jConvos.append({'msgs':jMsgs,'convoID':c.id})
		return HttpResponse(dumps(jConvos))
	else:
		return HttpResponse('This page has no messages.')

def fetchGroupConvos(request):
	#GET request by Ajax
	if request.user.is_authenticated():
		uid=request.user.id
		#Get convos
		group=GroupNode.objects.get(uid=uid,groupName=request.GET['groupHandle'])	
		convos=loads(group.convoList)
		if len(convos):
			for c in convos:
				messages=Message.objects.filter(convoID=c.id)
				log.error(str(c.id)+'Posting message')
				jMsgs=[]
				for m in messages:
					jMsgs.append({'text':m.text,'name':m.name,'id':m.id,
						'handle':m.handle,'parent':m.parentID})
				jConvos.append({'msgs':jMsgs,'convoID':c.id})
			return HttpResponse(dumps(jConvos))
		else:
			return HttpResponse('This group has no convos.')

	else:
		return HttpResponse('Not authenticated')




def converse(request):
	#return HttpResponse(request.GET.get('type'))
	#When messages come into the server, we need to check a) authentication
#b that they're not abusing.
	log.error('Posting message')
	if request.user.is_authenticated():
		text=request.GET['text']
		uid=request.user.id
		if len(text):
			c=Conversation(uid=uid)
			c.save()
			replyTo(request,c.id,0)
		return HttpResponse(c.id)

def reply(request):
	#return HttpResponse(request.GET.get('type'))
	#When messages come into the server, we need to check a) authentication
#b that they're not abusing.
	log.error('Posting message')
	if request.user.is_authenticated():
		text=request.GET['text']
		uid=request.user.id
		
		if len(text):
			replyTo(request,request.GET['convoID'],request.GET['parentID'])
		return HttpResponse(request.GET['convoID'])
		


def buildConversation(request):
	#Should return an HTTPResponse with the HTML format of the conversation
	messages=Message.objects.get(pConvo=convoID)
	template = loader.get_template('f1_a1/convoView.html')
	context = RequestContext(request, {'person':person})
	return HttpResponse(template.render(context))



def test(request,testNo):
	template = loader.get_template('f1_a1/test'+testNo+'.html')
	context = RequestContext(request, {})
	return HttpResponse(template.render(context))
	

def logout_view(request):
	logout(request)
	return HttpResponse("Logged out")


def csrf_failure(request, reason):
	return HttpResponse("CSRF failure")

#Non-HTTP-request functions

def replyTo(request,convoID,parentID):
	#Add child message to a particular message
	if request.user.is_authenticated():
		person=Person.objects.get(uid=request.user.id)
		m=Message(uid=request.user.id,text=request.GET['text'],
			handle=person.handle,name=person.name,
			parentID=parentID,
			convoID=convoID)
#OPT
#pConvo may be unused
		m.save()
#SEC
#We need to check that the message and the convo go together, to avoid malicious posts.

def aPost(request):
	log.error('Posting message')
	if request.user.is_authenticated():
		text=request.GET['text']
		uid=request.user.id
		if len(text):
			c=Conversation(uid=uid)
			c.save()
			replyTo(request,c.id,2)
		return HttpResponse(c.id)

def post_old(request,convo):
	log.error('Posting message')
	if request.user.is_authenticated():
		#Fill this in correctly:
		uid=request.user.id
		person=Person.objects.get(uid=request.user.id)

		m=Message(uid=request.user.id,text=request.GET['text'],
			handle=person.handle,name=person.name,pConvo=convo)
		m.save()	
		
	else:
		return HttpResponse('Not authenticated.')

def postConvo(request):
	#return HttpResponse(request.GET.get('type'))
	#When messages come into the server, we need to check a) authentication
#b that they're not abusing.
	log.error('Posting message')
	if request.user.is_authenticated():
		text=request.GET['text']
		uid=request.user.id
		if len(text):
			c=Conversation(uid=uid)
			c.save()
			replyTo(request,c.id,0)
		return HttpResponse(c.id)
