from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile,Alumno,Docente,Rol
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.shortcuts import get_object_or_404
from curso.utils import generarPassword
from django.http import HttpRequest
import threading
from django.core.mail import send_mail

def enviarCorreo(nombre,email,username,password):
    asunto = "Bienvenido a la plataforma OTEC ProCapacita"
    mensaje = (
        f"Hola {nombre},\n\n"
        f"Tu cuenta de docente ha sido creada exitosamente.\n"
        f"Usuario: {username}\n"
        f"Contraseña temporal: {password}\n\n"
        "Por seguridad, cambia tu contraseña después de iniciar sesión.\n\n"
        "Saludos,\nEl equipo de OTEC ProCapacita."
    )

    send_mail(
        asunto,
        mensaje,
        "no-reply@otecprocapacita.com",
        [email],
        fail_silently=False,
    )
    
class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rol
        fields="__all__"

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ['id','username']
        
class ProfileSerializer(serializers.ModelSerializer):
    rol=RolSerializer()
    class Meta:
        model=Profile
        fields="__all__"
        
class AlumnoSerializer(serializers.ModelSerializer):
    usuario = ProfileSerializer()
    class Meta:
        model=Alumno
        fields = ["id", "usuario", "fechaNacimiento"]
        
class DocenteSerializer(serializers.ModelSerializer):
    usuario = ProfileSerializer(read_only=True)
    class Meta:
        model=Docente
        fields="__all__"
        
        
    def create(self, validated_data):
        request:HttpRequest = self.context.get("request")
        
        nombre = request.data.get("nombre")
        apellido = request.data.get("apellido")
        rut = request.data.get("rut")
        email = request.data.get("email")
        telefono = request.data.get("telefono")
        especialidad = request.data.get("especialidad")
        
        username = email.split("@")[0]
        password = generarPassword()
        rol = Rol.objects.get(nombre="Docente")
        
        user = User.objects.create_user(
            username=username,
            password=password
        )
        
        profile = Profile.objects.create(
            user=user,
            nombre=nombre,
            apellido=apellido,
            email=email,
            rol=rol,
            rut=rut,
            telefono=telefono
        )
        
        docente = Docente.objects.create(
            usuario=profile,
            especialidad=especialidad
        )
        
        threading.Thread(
            target=enviarCorreo,
            args=(nombre,
            email,
            username,
            password,
            ),
            daemon=True
        ).start()
        
        return docente
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        identificador = attrs.get("username")
        password = attrs.get("password")
        
        user = None
        
        if "@" in identificador:
            profile:Profile = Profile.objects.filter(email=identificador).first()
            user = profile.user
            
        else:
            try:
                profile:Profile = Profile.objects.filter(rut=identificador).first()
                user = profile.user
            except:
                raise serializers.ValidationError("Usuario no encontrado")
            
        if not user:
            raise serializers.ValidationError("usuario no encontrado")
        
        
        data = super().validate({"username":user.username,"password":password})
        serializer = ProfileSerializer(profile)
        data["user"] = serializer.data
        return data
    
        # username = attrs.get("username")
        # password = attrs.get("password")
        
        # user = get_object_or_404(User,username=username)
        # if not user.check_password(password):
        #     raise serializers.ValidationError("datos no validos")
        
        # data = super().validate({"username":username,"password":password})
        # serializer = UserSerializer(user)
        # data["user"] = serializer.data
        # return data