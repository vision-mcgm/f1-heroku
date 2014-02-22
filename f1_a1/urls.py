from django.conf.urls import patterns, url

from f1_a1 import views

urlpatterns = patterns('',
   # url(r'^$', views.index, name='index'),
   #Anything
  # url(r'^$', views.wall, name='wall'),
  
  #NO EOL matchers in REs which get included!
   #Wall-not required!
	url(r'^/wall$', views.wall, name='wall'),
	url(r'^/person$', views.person, name='person'),
   # url(r'^(?P<poll_id>\d+)/vote/$', views.vote, name='vote'),
   #Wall post
 	url(r'^wallpost$', views.wallpost, name='wallpost'),
   #All
   url(r'^$', views.wall, name='wall'),
   

)