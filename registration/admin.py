from django.contrib import admin

# Register your models here.
from .models import Profile, Docente, Alumno,Rol


admin.site.register(Profile)
admin.site.register(Docente)
admin.site.register(Alumno)
admin.site.register(Rol)

