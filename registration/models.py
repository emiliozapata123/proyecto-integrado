from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Rol(models.Model):
    nombre=models.CharField(max_length=20,unique=True,blank=True,null=True)

    def __str__(self):
        return self.nombre
 
class Profile(models.Model):
    user=models.OneToOneField(User,on_delete=models.CASCADE,related_name="profile")
    nombre=models.CharField(max_length=100,null=True,blank=True)
    apellidoPaterno=models.CharField(max_length=100,null=True,blank=True)
    apellidoMaterno=models.CharField(max_length=100,null=True,blank=True)
    telefono=models.CharField(max_length=100)
    email=models.EmailField(unique=True,blank=True,null=True)
    direccion=models.CharField(max_length=255,blank=True,null=True)
    fechaNacimiento=models.DateField(blank=True,null=True)
    rut=models.CharField(max_length=100,unique=True)
    rol=models.ForeignKey(Rol,on_delete=models.CASCADE,null=True,blank=True)
    
    
class Docente(models.Model):
    usuario=models.OneToOneField(Profile,on_delete=models.CASCADE)
    especialidad=models.CharField(max_length=100)


class Alumno(models.Model):
    usuario=models.OneToOneField(Profile,on_delete=models.CASCADE)
    fechaInscripcion=models.DateField(auto_now_add=True)
    def __str__(self):
        self.usuario:Profile
        return self.usuario.user.get_full_name()
    
    