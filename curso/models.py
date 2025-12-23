from django.db import models
from registration.models import Alumno,Docente


# Create your models here.

class Curso(models.Model):
    nombre=models.CharField(max_length=200,unique=True)
    descripcion=models.TextField()
    precio=models.PositiveIntegerField()
    horas=models.PositiveIntegerField()
    cupo=models.PositiveIntegerField()
    categoria=models.CharField(max_length=100,null=True,blank=True)
    docente=models.ForeignKey(Docente,on_delete=models.CASCADE,related_name="cursos",blank=True,null=True)
    imagen=models.ImageField(upload_to="portada",blank=True,null=True)

class Modulo(models.Model):
    curso=models.ForeignKey(Curso,on_delete=models.CASCADE,related_name="modulos")
    titulo=models.CharField(max_length=200,unique=True)
    descripcion=models.TextField(blank=True)
    orden=models.PositiveIntegerField(default=1)

class Material(models.Model):
    modulo = models.ForeignKey(Modulo, on_delete=models.CASCADE, related_name="materiales")
    titulo = models.CharField(max_length=200,unique=True)
    descripcion = models.TextField(blank=True)
    archivo = models.FileField(upload_to="materiales/", blank=True, null=True)
    link = models.URLField(blank=True, null=True)
    tipo = models.CharField(
        max_length=20,
        choices=[
            ("PDF", "PDF"),
            ("VIDEO", "VIDEO"),
            ("LINK", "Link"),
            ("OTRO", "Otro"),
        ],
        default="PDF"
    )
    orden = models.PositiveIntegerField(default=1)

    def __str__(self):
        return self.titulo
    
class Inscripcion(models.Model):
    alumno=models.ForeignKey(Alumno,on_delete=models.CASCADE,related_name="inscripciones")
    curso=models.ForeignKey(Curso,on_delete=models.CASCADE,related_name="inscripciones",blank=True,null=True)
    fecha=models.DateField(auto_now_add=True)
    estado=models.CharField(max_length=20,choices=[
        ("Pendiente","Pendiente"),
        ("En progreso","En progreso"),
        ("Aprobado","Aprobado"),
        ("Reprobado","Reprobado"),
        ], default="Pendiente"
    )

    
class PreInscripcion(models.Model):
    nombre=models.CharField(max_length=100)
    apellidoPaterno=models.CharField(max_length=200,null=True,blank=True)
    apellidoMaterno=models.CharField(max_length=200,null=True,blank=True)
    rut=models.CharField(max_length=15)
    correo=models.EmailField()
    telefono=models.CharField(max_length=20)
    direccion=models.CharField(max_length=255,blank=True)
    fechaPostulacion=models.DateField(auto_now_add=True)
    fechaNacimiento=models.DateField(blank=True,null=True)
    cursoInteres=models.ForeignKey(Curso,on_delete=models.CASCADE,blank=True,null=True)
    estado=models.CharField(max_length=20,
        choices=[
            ("Pendiente", "Pendiente"),
            ("Aprobado", "Aprobado"),
            ("Rechazado", "Rechazado"),
        ],
        default="Pendiente"
    )


class Horario(models.Model):
    DIAS_SEMANA = [
        ('Lunes', 'Lunes'),
        ('Martes', 'Martes'),
        ('Miercoles', 'Miercoles'),
        ('Jueves', 'Jueves'),
        ('Viernes', 'Viernes'),
    ]
    curso = models.ForeignKey(Curso,related_name='horarios',on_delete=models.CASCADE)
    dia = models.CharField(max_length=10, choices=DIAS_SEMANA)
    hora_inicio = models.TimeField()
    hora_fin = models.TimeField()
    activo = models.BooleanField(default=True)

    class Meta:
        ordering = ['dia', 'hora_inicio']
        unique_together = ('curso', 'dia', 'hora_inicio')

    def __str__(self):
        return f"{self.curso.nombre} - {self.dia} ({self.hora_inicio} - {self.hora_fin})"
