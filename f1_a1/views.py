from django.contrib.auth import authenticate,logout
from django.contrib.auth import login as auth_login
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext, loader,Context
from f1_a1.models import Poll,WallPost,Person,Message,Conversation
from django.core.urlresolvers import reverse
from django.contrib.auth.models import User
from json import dumps
import logging



def welcome(request):
	template = loader.get_template('f1_a1/welcome.html')
	context = RequestContext(request, {})
	return HttpResponse(template.render(context))

def logout_view(request):
	logout(request)
	return HttpResponse("Logged out")

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
