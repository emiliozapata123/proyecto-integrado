from django.db import models
from curso.models import Inscripcion

# Create your models here.

class Certificado(models.Model):
    inscripcion=models.OneToOneField(Inscripcion,on_delete=models.CASCADE)
    certificado=models.FileField(upload_to="certificados")
    fechaGenerado=models.DateField(auto_now_add=True)