from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import APIView
from .serializers import ProfileSerializer,DocenteSerializer,AlumnoSerializer
from .models import Profile,Docente,Alumno
from rest_framework.views import Response
from rest_framework import status
from django.http import HttpRequest
from curso.serializers import InscripcionSerializer
from curso.models import Inscripcion

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    
class DocenteView(APIView):
    def get(self,request:HttpRequest,id=None):
        if not id:
            docentes = Docente.objects.all()
            data = []
            
            for docente in docentes:
                data.append({
                    "id":docente.id,
                    "nombre":docente.usuario.nombre,
                    "apellido":docente.usuario.apellido,
                    "rut":docente.usuario.rut,
                    "email":docente.usuario.email,
                    "telefono":docente.usuario.telefono,
                    "rol":docente.usuario.rol.nombre,
                    "especialidad":docente.especialidad,
                    "cursos":docente.cursos.count()
                })
            
            return Response(data,status=status.HTTP_200_OK)
        
        docente = Docente.objects.get(pk=id)
        nuevaData = {
            "id":docente.id,
            "nombre":docente.usuario.nombre,
            "apellido":docente.usuario.apellido,
            "rut":docente.usuario.rut,
            "email":docente.usuario.email,
            "telefono":docente.usuario.telefono,
            "rol":docente.usuario.rol.nombre,
            "especialidad":docente.especialidad,
            "cursos":[]
        }
        
        for c in docente.cursos.all():
            nuevaData["cursos"].append({
                "id":c.id,
                "nombre":c.nombre,
                "descripcion":c.descripcion,
                "categoria":c.categoria
            })
            
        return Response(nuevaData,status=status.HTTP_200_OK)
        
    
    def post(self,request:HttpRequest):
        serializer = DocenteSerializer(data=request.data, context={"request":request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    
class AlumnoView(APIView):
    def get(self,request,id=None):
        if id:
            alumno = Alumno.objects.get(pk=id)
            data = {
                "id":alumno.id,
                "nombre":alumno.usuario.nombre,
                "apellido":alumno.usuario.apellido,
                "telefono":alumno.usuario.telefono,
                "email":alumno.usuario.email,
                "rut":alumno.usuario.rut,
                "direccion":alumno.usuario.direccion,
                "fechaNacimiento":alumno.fechaNacimiento,
                "fechaInscripcion":alumno.fechaInscripcion,
                "cursos":[]
            }
            
            for inscripcion in alumno.inscripciones.all():
                curso = inscripcion.curso
                if not curso:
                    continue
                else:
                    data["cursos"].append({
                        "id":curso.id,
                        "nombre":curso.nombre,
                        "categoria":curso.categoria,
                        "descripcion":curso.descripcion,
                        "horas":curso.horas,
                        "fechaInscripcion":inscripcion.fecha,
                        "estado":inscripcion.estado,
                        "docente":{
                            "id":curso.docente.id,
                            "nombre":curso.docente.usuario.nombre,
                            "apellido":curso.docente.usuario.apellido
                        }
                    })
            return Response(data,status=status.HTTP_200_OK)
        
        alumnos = Alumno.objects.all()
        
        data = []
        for alumno in alumnos:
            alumnoList = {
                "id":alumno.id,
                "nombre":alumno.usuario.nombre,
                "apellido":alumno.usuario.apellido,
                "telefono":alumno.usuario.telefono,
                "email":alumno.usuario.email,
                "rut":alumno.usuario.rut,
                "direccion":alumno.usuario.direccion,
                "fechaNacimiento":alumno.fechaNacimiento,
                "fechaInscripcion":alumno.fechaInscripcion,
                "cursos":[]
            }
            
            for inscripcion in alumno.inscripciones.all():
                curso = inscripcion.curso
                if not curso:
                    continue
                else:
                    alumnoList["cursos"].append({
                        "id":curso.id,
                        "nombre":curso.nombre,
                        "categoria":curso.categoria,
                        "descripcion":curso.descripcion,
                        "horas":curso.horas,
                        "fechaInscripcion":inscripcion.fecha,
                        "estado":inscripcion.estado,
                        "docente":{
                            "id":curso.docente.id,
                            "nombre":curso.docente.usuario.nombre,
                            "apellido":curso.docente.usuario.apellido
                        }
                    })
            data.append(alumnoList)
        return Response(data,status=status.HTTP_200_OK)
    
class AlumnoInscripcionView(APIView):
    def get(self,request):
        alumno = request.user.profile.alumno
        data = {
            "id":alumno.id,
            "nombre":alumno.usuario.nombre,
            "apellido":alumno.usuario.apellido,
            "email":alumno.usuario.email,
            "rut":alumno.usuario.rut,
            "cursos":[]
        }
        
        for inscripcion in alumno.inscripciones.all():
            curso = inscripcion.curso
            if not curso:
                continue
            else:
                data["cursos"].append({
                    "id":curso.id,
                    "nombre":curso.nombre,
                    "descripcion":curso.descripcion,
                    "cupo":curso.cupo,
                    "precio":curso.precio,
                    "fecha":inscripcion.fecha,
                    "estado":inscripcion.estado
                })
            
        return Response(data,status=status.HTTP_200_OK)
    
class CertificadoEstudianteView(APIView):
    def get(self, request):
        alumno = request.user.profile.alumno
        inscripciones = Inscripcion.objects.filter(alumno=alumno,estado="Aprobado")
        
        data = []
        for i in inscripciones:
            curso = i.curso
            inscripcion = {
                "id":i.id,
                "curso":{
                    "id":curso.id,
                    "nombre":curso.nombre,
                    "horas":curso.horas
                },
                "docente":{
                    "id":curso.docente.id,
                    "nombre":curso.docente.usuario.nombre,
                    "apellido":curso.docente.usuario.apellido,
                    "rut":curso.docente.usuario.rut
                },
                "fecha":i.fecha,
                "certificado": i.certificado.certificado.url if hasattr(i, "certificado") else None
            }
            data.append(inscripcion)
        
        return Response(data,status=status.HTTP_200_OK)
        