from rest_framework import serializers
from .models import Curso,PreInscripcion,Inscripcion
  
class CursoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Curso
        fields="__all__"
        

class PreInscripcionSerializer(serializers.ModelSerializer):
    cursoInteres = CursoSerializer()
    class Meta:
        model=PreInscripcion
        fields="__all__"
        
class PreInscripcionWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=PreInscripcion
        fields="__all__"
        
class InscripcionSerializer(serializers.ModelSerializer):
    curso = CursoSerializer(read_only=True)
    class Meta:
        model=Inscripcion
        fields="__all__"