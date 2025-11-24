from rest_framework import serializers
from .models import Curso,PreInscripcion,Inscripcion
from registration.serializers import DocenteSerializer
  
class CursoSerializer(serializers.ModelSerializer):
    docente = DocenteSerializer()
    class Meta:
        model=Curso
        fields="__all__"
        

class PreInscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model=PreInscripcion
        fields="__all__"
        
class PreInscripcionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=PreInscripcion
        fields="__all__"
        
class InscripcionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Inscripcion
        fields="__all__"