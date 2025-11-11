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
    def get(self,request,id=None):
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
                    "rol":docente.usuario.rol,
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
            "rol":docente.usuario.rol,
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
            if alumno:
                serializer = AlumnoSerializer(alumno)
                return Response(serializer.data,status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        alumno = Alumno.objects.all()
        serializer = AlumnoSerializer(alumno,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    # def post(self,request:HttpRequest):
    #     serializer = ProfileSerializer()
