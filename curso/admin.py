from django.contrib import admin
from .models import Curso,Inscripcion,PreInscripcion

# Register your models here.
admin.site.register(Curso)
admin.site.register(Inscripcion)
admin.site.register(PreInscripcion)

