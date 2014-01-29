from django.contrib import admin
from f1_a1.models import Poll,Person
from f1_a1.models import Choice

class ChoiceInline(admin.StackedInline):
    model = Choice
    extra = 3

class PollAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question']}),
        ('Date information', {'fields': ['pub_date']}),
    ]
    inlines = [ChoiceInline]
    list_display = ('question', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question']

class PersonAdmin(admin.ModelAdmin):
    pass



admin.site.register(Poll, PollAdmin)
admin.site.register(Person, PersonAdmin)


# Register your models here.
