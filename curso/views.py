# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from registration.models import Profile, Alumno,Rol
from curso.models import PreInscripcion, Inscripcion,Curso,Modulo,Material,Horario
from registration.serializers import UserSerializer,AlumnoSerializer,DocenteSerializer
from .serializers import PreInscripcionWriteSerializer,PreInscripcionSerializer,CursoSerializer,InscripcionSerializer, CursoCreateSerializer,ModuloSerializer,ModuloWriteSerializer,MaterialSerializer,MaterialWriteSerializer,HorarioSerializer,HorarioWriteSerializer
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
    [IsAuthenticated]
    
    def post(self, request: HttpRequest, id):
        try:
            preinscripcion = PreInscripcion.objects.get(pk=id)
        except PreInscripcion.DoesNotExist:
            return Response(
                {"error": "preinscripcion no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )

        if preinscripcion.estado == "Aprobado":
            return Response({"mensaje": "ya se agregó la inscripción"})

        estado = request.data.get("estado")
        if estado == "Rechazado":
            preinscripcion.estado = "Rechazado"
            preinscripcion.save()
            return Response(
                {"mensaje": "se rechazó la preinscripción"},
                status=status.HTTP_200_OK
            )

        user = User.objects.filter(email=preinscripcion.correo).first()
        rut = Profile.objects.filter(rut=preinscripcion.rut).first()

        if user or rut:
            return Response(
                {"error": "cuenta de alumno ya existe"},
                status=status.HTTP_400_BAD_REQUEST
            )

        username = preinscripcion.correo
        password = generarPassword()
        rol = Rol.objects.get(nombre="Alumno")

        user = User.objects.create_user(
            username=username,
            email=preinscripcion.correo,
            password=password,
        )

        profile = Profile.objects.create(
            user=user,
            nombre=preinscripcion.nombre,
            apellidoPaterno=preinscripcion.apellidoPaterno,
            apellidoMaterno=preinscripcion.apellidoMaterno,
            email=preinscripcion.correo,
            telefono=preinscripcion.telefono,
            direccion=preinscripcion.direccion,
            rut=preinscripcion.rut,
            fechaNacimiento=preinscripcion.fechaNacimiento,
            rol=rol,
        )

        alumno = Alumno.objects.create(usuario=profile)

        serializer = InscripcionSerializer(data={
            "alumno": alumno.id,
            "curso": preinscripcion.cursoInteres.id
        })

        if serializer.is_valid():
            serializer.save()
            preinscripcion.estado = "Aprobado"
            preinscripcion.save()

            threading.Thread(
                target=enviarCorreo,
                args=(
                    preinscripcion.nombre,
                    preinscripcion.correo,
                    username,
                    password,
                ),
                daemon=True
            ).start()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PreInscripcionView(APIView):
    [IsAuthenticated]

    def post(self,request:HttpRequest):
        serializer = PreInscripcionWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_4009_BAD_REQUEST)
    
    def get(self,request:HttpRequest):
        preinscripciones = PreInscripcion.objects.all()
        serializer = PreInscripcionSerializer(preinscripciones,many=True,context={"request": request})
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class CursoDisponibleAlumnoView(APIView):
    [IsAuthenticated]

    def get(self,request):
        alumno = request.user.profile.alumno
        cursosInscrito = Inscripcion.objects.filter(alumno=alumno).values_list('curso_id', flat=True)
        cursosDisponibles = Curso.objects.exclude(id__in=cursosInscrito)
        serializer = CursoSerializer(cursosDisponibles,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class CursoPublicView(APIView):
    def get(self,request:HttpRequest):
        cursos = Curso.objects.all()
        data = []

        for curso in cursos:
            docente = None
            if curso.docente:
                docente = Docente.objects.get(pk=curso.docente.id)

            contador = 0
            for i in curso.inscripciones.all():
                contador +=1

            data.append({
                "id":curso.id,
                "nombre":curso.nombre,
                "descripcion":curso.descripcion,
                "categoria":curso.categoria,
                "precio":curso.precio,
                "horas":curso.horas,
                "cupo":curso.cupo,
                "imagen":curso.imagen.url if curso.imagen else None,
                "docente":docente.usuario.nombre if docente else None,
                "inscripciones":contador 
            })
                
        return Response(data,status=status.HTTP_200_OK)
    
class CursoDetailView(APIView):
    [IsAuthenticated]
    def get(self,request,id):
        curso = Curso.objects.get(pk=id)
        serializer = CursoSerializer(curso)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class CursoEstudianteView(APIView):
    [IsAuthenticated]
    def get(self,request):
        cursos = Curso.objects.all()
        data = []

        for curso in cursos:
            alumnos = []
            for i in curso.inscripciones.all():
                alumno = i.alumno
                alumnos.append({
                    "id":alumno.id,
                    "nombre":alumno.usuario.nombre,
                    "apellidoPaterno":alumno.usuario.apellidoPaterno,
                    "apellidoMaterno":alumno.usuario.apellidoMaterno,
                    "rut":alumno.usuario.rut,
                    "telefono":alumno.usuario.telefono,
                    "correo":alumno.usuario.email,
                    "direccion":alumno.usuario.direccion,
                    "curso":curso.nombre
                }) 

            data.append({
                "id": curso.id,
                "nombre": curso.nombre,
                "horas": curso.horas,
                "cupo": curso.cupo,
                "precio":curso.precio,
                "categoria": curso.categoria,
                "imagen": curso.imagen.url if curso.imagen else None,
                "alumnos": alumnos
            })
        return Response(data,status=status.HTTP_200_OK)


        
        
class CursoView(APIView):
    [IsAuthenticated]
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
                    "apellidoPaterno":alumno.usuario.apellidoPaterno,
                    "apellidoMaterno":alumno.usuario.apellidoMaterno,
                    "rut":alumno.usuario.rut,
                    "estado":inscripcion.estado,
                    "fecha":inscripcion.fecha
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
        serializer = CursoCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,id):
        curso = Curso.objects.get(pk=id)
        data = request.data.copy()
        
        if 'imagen' not in request.FILES:
            data.pop('imagen', None)

        serializer = CursoCreateSerializer(curso, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request:HttpRequest,id):
        curso = Curso.objects.get(pk=id)
        if curso: 
            curso.delete()
            curso.imagen.delete(save=False)
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class AsignarCursosDocente(APIView):
    [IsAuthenticated]
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
    [IsAuthenticated]

    def patch(self,request,id):
        inscripcion = Inscripcion.objects.get(pk=id)
        if inscripcion.estado == "Aprobado":
            return Response({"error":"curso ya aprobado"},status=status.HTTP_400_BAD_REQUEST)
        
        inscripcion.estado = "Aprobado"
        inscripcion.save()
        return Response({"mensaje":"curso aprobado"},status=status.HTTP_200_OK)
        
    
class ModuloView(APIView):
    [IsAuthenticated]

    def get(self,request,id):
        try:
            curso = Curso.objects.get(pk=id)
        except Curso.DoesNotExist:
            return Response({"error": "Curso no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        modulos = Modulo.objects.filter(curso=curso).order_by('orden')
        serializer = ModuloSerializer(modulos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self,request,id):
        try:
            curso = Curso.objects.get(pk=id)
        except Curso.DoesNotExist:
            return Response({"error": "Curso no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        
        ultimoOrden = Modulo.objects.filter(curso=curso).count()+1

        data = request.data.copy()
        data["curso"] = curso.id
        data["orden"] = ultimoOrden
        serializer = ModuloWriteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            modulos = Modulo.objects.filter(curso=curso).order_by("orden")
            data = ModuloSerializer(modulos, many=True)
            return Response(data.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self,request,modulo_id):
        try:
            modulo = Modulo.objects.get(pk=modulo_id)
        except Modulo.DoesNotExist:
            return Response({"error":"Modulo no encontrado"},status=status.HTTP_404_NOT_FOUND)

        serializer = ModuloSerializer(modulo, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

    def delete(self,request,id=None):
        if id:
            try:
                modulo = Modulo.objects.get(pk=id)
            except Modulo.DoesNotExist:
                return Response({"error":"Modulo no encontrado"},status=status.HTTP_404_NOT_FOUND)
        
            modulo.delete()
            return Response(status=status.HTTP_200_OK)
        

class MaterialView(APIView):
    [IsAuthenticated]

    def get(self,request,id):
        try:
            modulo = Modulo.objects.get(pk=id)
        except Modulo.DoesNotExist:
            return Response({"error":"Modulo no encontrado"},status=status.HTTP_404_NOT_FOUND)

        material = Material.objects.filter(modulo=modulo).order_by("orden")
        serializer = MaterialSerializer(material, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


    def post(self,request,id):
        try:
            modulo = Modulo.objects.get(pk=id)
        except Modulo.DoesNotExist:
            return Response({"error":"Modulo no encontrado"},status=status.HTTP_404_NOT_FOUND)
        
        ultimoOrden = Material.objects.filter(modulo=modulo).count()+1

        data = request.data.copy()
        data["modulo"] = modulo.id
        data["orden"] = ultimoOrden

        serializer = MaterialWriteSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            materiales = Material.objects.all()
            data = MaterialSerializer(materiales, many=True)
            return Response(data.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HorarioView(APIView):
    [IsAuthenticated]

    def get(self,request,id):
        curso = Curso.objects.get(pk=id)
        horarios = Horario.objects.filter(curso=curso)
        serializer = HorarioSerializer(horarios,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer = HorarioWriteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self,request,curso_id,id):
        curso = Curso.objects.get(pk=curso_id)
        horario = Horario.objects.get(curso=curso,pk=id)
        if horario:
            horario.delete()
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)



    
    