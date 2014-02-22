from django.conf.urls import patterns, include, url


from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
  #NO EOL matchers in REs which get included!
    # Examples:
    # url(r'^$', 'f1.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    #  url(r'^main/', ),
#url(r'^admin/', include(admin.site.urls)),
   # url(r'^polls/', include('f1_a1.urls')),url(r'^$', views.welcome, name='welcome'),
  url(r'^admin/', include(admin.site.urls)),

#Page requests
  url(r'^wall/', include('f1_a1.urls', namespace="f1_a1")),
 # url(r'^home/', include('f1_a1.urls', namespace="f1_a1"),name='home'),
 url(r'^home$', 'f1_a1.views.home',name='home'),
 #url(r'^home$', 'f1_a1.views.ingroups',name='ingroups'),
 url(r'^groups$', 'f1_a1.views.groups',name='groups'),
 url(r'^login$', 'f1_a1.views.login',name='login'),
 url(r'^join$', 'f1_a1.views.join',name='join'),
 #url(r'^login2$', 'django.contrib.auth.views.login',name='login2'),
 url(r'^logout/', 'f1_a1.views.logout_view',name='logout'),
 url(r'^welcome$', 'f1_a1.views.welcome',name='welcome'),
 url(r'^person/(\w*)$', 'f1_a1.views.person', name='person'),
 #Post message: parent convo and parent message
 url(r'^post$', 'f1_a1.views.post', name='post'),
  url(r'^converse$', 'f1_a1.views.converse', name='converse'),
  url(r'^reply$', 'f1_a1.views.reply', name='reply'),

#AJAX request handlers
 url(r'^getMessagesByUID$', 'f1_a1.views.getMessagesByUID', name='getMessagesByUID'),
  #url(r'^getMessagesByConvoID$', 'f1_a1.views.getMessagesByConvoID', name='getMessagesByConvoID'),
 url(r'^getGroups$', 'f1_a1.views.getGroups', name='getGroups'),

 
 url(r'^test(\d*)$', 'f1_a1.views.test', name='test'),

  url(r'', 'f1_a1.views.welcome'),
)
