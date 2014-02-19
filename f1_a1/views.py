from django.contrib.auth import authenticate,login,logout
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext, loader,Context
from f1_a1.models import Poll,WallPost,Person
from django.core.urlresolvers import reverse
import logging


def index(request):
    latest_poll_list = Poll.objects.order_by('-pub_date')[:5]
    template = loader.get_template('f1_a1/index.html')
    context = RequestContext(request, {
        'latest_poll_list': latest_poll_list,
    })
    return HttpResponse(template.render(context))
# Create your views here.


def vote(request):
	return HttpResponse("You're voting on poll")

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

def welcome(request):
	template = loader.get_template('f1_a1/welcome.html')
	context = RequestContext(request, {})
	return HttpResponse('wwwwWELCOME')


def home(request):
	username = request.POST['username']
	password = request.POST['password']
	user = authenticate(username=username, password=password)
	if user is not None:
		if user.is_active:
			login(request, user)
			return HttpResponse("Logged in OK")
		else:
			return HttpResponse("Problem logging in")
	else:
		return HttpResponse("Problem authenticating")

def person(request,id):
	if Person.objects.filter(handle=id).count():
		person=Person.objects.get(handle=id)
		template = loader.get_template('f1_a1/person.html')
		context = RequestContext(request, {'person':person})
		return HttpResponse(template.render(context))
	else:
		return HttpResponse('No person by that name: '+id)

def message(request):
	return HttpResponse('This is a message!')
	

def logout_view(request):
	logout(request)
	return HttpResponse("Logged out")



def csrf_failure(request, reason):
	return HttpResponse("CSRF failure")
