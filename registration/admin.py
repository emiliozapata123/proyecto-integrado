from django.contrib import admin

# Register your models here.
from .models import Profile, Docente, Alumno

admin.site.register(Profile)
admin.site.register(Docente)
admin.site.register(Alumno)
