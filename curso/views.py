# Create your views here.
from rest_framework.decorators import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from registration.models import Profile, Alumno,Rol
from curso.models import PreInscripcion, Inscripcion,Curso
from registration.serializers import UserSerializer,AlumnoSerializer,DocenteSerializer
from .serializers import PreInscripcionWriteSerializer,PreInscripcionSerializer,CursoSerializer,InscripcionSerializer
from django.http import HttpRequest
from rest_framework.permissions import IsAuthenticated
from registration.models import Docente
from .utils import generarPassword
import threading
from django.core.mail import send_mail

# Create your views here.

def enviarCorreo(nombre,email,username,password):
    asunto = "Bienvenido a la plataforma OTEC ProCapacita"
    mensaje = (
        f"Hola {nombre},\n\n"
        f"Tu cuenta de alumno ha sido creada exitosamente.\n"
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
    
class InscripcionView(APIView):
    def post(self,request:HttpRequest,id):
        try:
            preinscripcion = PreInscripcion.objects.get(pk=id)
        except PreInscripcion.DoesNotExist:
            return Response({"error":"preinscripcion no encontrado"},status=status.HTTP_404_NOT_FOUND)
        
        estado = request.data.get("estado")
        if estado == "Rechazado":
            preinscripcion.estado="Rechazado"
            preinscripcion.save()
            return Response({"mensaje":"se rechazo la preinscripcion"},status=status.HTTP_201_CREATED)
        
        user = User.objects.filter(email=preinscripcion.correo).first()
        rut = Profile.objects.filter(rut=preinscripcion.rut).first()
        username = preinscripcion.correo.split("@")[0]
        
        password = generarPassword()
        rol = Rol.objects.get(nombre="Alumno")
        
        if user and rut:
            return Response({"error":"cuenta de alumno ya existe"},status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=username,
            password=password,
        )
        
        profile = Profile.objects.create(
            user=user,
            nombre=preinscripcion.nombre,
            apellido=preinscripcion.apellido,
            email=preinscripcion.correo,
            telefono=preinscripcion.telefono,
            direccion=preinscripcion.direccion,
            rut=preinscripcion.rut,
            rol=rol,
        )
        alumno = Alumno.objects.create(usuario=profile,fechaNacimiento=preinscripcion.fechaNacimiento)
        
        inscripcion = {
            "alumno":alumno.id,
            "curso":preinscripcion.cursoInteres.id
        }
        
        serializer = InscripcionSerializer(data=inscripcion)
        if serializer.is_valid():
            serializer.save()
            preinscripcion.estado = "Aprobado"
            preinscripcion.save()
            
            threading.Thread(
                target=enviarCorreo,
                args=(preinscripcion.nombre,
                preinscripcion.correo,
                username,
                password,
                ),
                daemon=True
            ).start()
            
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class PreInscripcionView(APIView):
    def post(self,request:HttpRequest):
        serializer = PreInscripcionWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def get(self,request:HttpRequest):
        preinscripciones = PreInscripcion.objects.all()
        serializer = PreInscripcionSerializer(preinscripciones,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    

class CursoPublicView(APIView):
    def get(self,request:HttpRequest):
        cursos = Curso.objects.all()
        serializer = CursoSerializer(cursos,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class CursoDetailView(APIView):
    def get(self,request,id):
        curso = Curso.objects.get(pk=id)
        serializer = CursoSerializer(curso)
        return Response(serializer.data,status=status.HTTP_200_OK)
        
class CursoView(APIView):
    def get(self,request):
        profile = Profile.objects.get(user=request.user)
        docente = Docente.objects.get(usuario=profile)
        cursos = Curso.objects.filter(docente=docente)
        
        data = []
        for curso in cursos:
            alumnos = []
            for inscripcion in curso.inscripciones.all():
                alumno = inscripcion.alumno
                alumnos.append({
                    "id":alumno.id,
                    "inscripcion_id":inscripcion.id,
                    "nombre":alumno.usuario.nombre,
                    "apellido":alumno.usuario.apellido,
                    "rut":alumno.usuario.rut
                })
                
            data.append({
                "id": curso.id,
                "nombre": curso.nombre,
                "horas": curso.horas,
                "cupo": curso.cupo,
                "categoria": curso.categoria,
                "imagen": curso.imagen.url if curso.imagen else None,
                "alumnos": alumnos
            })
            
        return Response(data,status=status.HTTP_200_OK)
    
    def post(self,request:HttpRequest):
        serializer = CursoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request:HttpRequest,id):
        curso = Curso.objects.get(pk=id)
        if curso: 
            curso.delete()
            curso.imagen.delete(save=False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class AsignarCursosDocente(APIView):
    def patch(self,request,id=None):
        docente = Docente.objects.get(pk=id)
        cursos = request.data
        
        for cursoID in cursos:
            curso = Curso.objects.get(pk=cursoID)
            if curso.docente is None:
                curso.docente = docente
                curso.save()
            
        serializer = DocenteSerializer(docente)
        return Response(serializer.data,status=status.HTTP_200_OK)
        
        
class AprobarCursoView(APIView):
    def patch(self,request,id):
        inscripcion = Inscripcion.objects.get(pk=id)
        inscripcion.estado = "Aprobado"
        inscripcion.save()
        return Response({"mensaje":"curso aprobado"},status=status.HTTP_200_OK)
        
    
    
        
    
    