from django.contrib.auth import authenticate,login,logout
from django.shortcuts import render
from django.http import HttpResponse,HttpResponseRedirect
from django.template import RequestContext, loader,Context
from f1_a1.models import Poll,WallPost,Person
from django.core.urlresolvers import reverse
import logging



def welcome(request):
	template = loader.get_template('f1_a1/welcome.html')
	context = RequestContext(request, {})
	return HttpResponse(template.render(context))

def logout_view(request):
	logout(request)
	return HttpResponse("Logged out")
