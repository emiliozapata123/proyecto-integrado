from django.db import models
from registration.models import Alumno,Docente


# Create your models here.

class Curso(models.Model):
    nombre=models.CharField(max_length=200,unique=True)
    descripcion=models.TextField()
    precio=models.DecimalField(max_digits=10, decimal_places=2, default=0)
    horas=models.PositiveIntegerField()
    cupo=models.PositiveIntegerField()
    categoria=models.CharField(max_length=100,null=True,blank=True)
    docente=models.ForeignKey(Docente,on_delete=models.CASCADE,related_name="cursos",blank=True,null=True)
    imagen=models.ImageField(upload_to="portada",blank=True,null=True)
    
class Inscripcion(models.Model):
    alumno=models.ForeignKey(Alumno,on_delete=models.CASCADE,related_name="inscripciones")
    curso=models.ForeignKey(Curso,on_delete=models.CASCADE,related_name="inscripciones")
    fecha=models.DateField(auto_now_add=True)
    estado=models.CharField(max_length=50,default="pendiente")
    
class PreInscripcion(models.Model):
    nombre=models.CharField(max_length=100)
    apellido=models.CharField(max_length=200)
    rut=models.CharField(max_length=15)
    fechaNacimiento=models.DateField(blank=True,null=True)
    correo=models.EmailField()
    telefono=models.CharField(max_length=20)
    direccion=models.CharField(max_length=255,blank=True)
    cursoInteres=models.ForeignKey(Curso,on_delete=models.CASCADE,related_name="preinscripiones")
    fechaPostulacion=models.DateTimeField(auto_now_add=True)
    estado=models.CharField(max_length=20,
                            choices=[
            ("Pendiente", "Pendiente"),
            ("Aprobado", "Aprobado"),
            ("Rechazado", "Rechazado"),
        ],
        default="Pendiente"
    )

