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

  url(r'^wall/', include('f1_a1.urls', namespace="f1_a1")),
 # url(r'^home/', include('f1_a1.urls', namespace="f1_a1"),name='home'),
 url(r'^home/', 'f1_a1.views.home',name='home'),
 url(r'^login/$', 'django.contrib.auth.views.login'),
 url(r'^logout/', 'f1_a1.views.logout_view',name='logout'),
 url(r'^person/(\w*)$', 'f1_a1.views.person', name='person'),
 url(r'^message/$', 'f1_a1.views.message', name='message'),
   #Any
  url(r'', 'f1_a1.views.welcome'),
)
