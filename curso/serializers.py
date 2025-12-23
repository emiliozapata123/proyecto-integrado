from rest_framework import serializers
from .models import Curso,PreInscripcion,Inscripcion,Modulo,Material,Horario
from registration.serializers import DocenteSerializer
  
class CursoSerializer(serializers.ModelSerializer):
    docente = DocenteSerializer()
    class Meta:
        model=Curso
        fields="__all__"
        
class CursoCreateSerializer(serializers.ModelSerializer):
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
    class Meta:
        model=Inscripcion
        fields="__all__"

class ModuloSerializer(serializers.ModelSerializer):
    curso = CursoSerializer()
    class Meta:
        model=Modulo
        fields="__all__"

class ModuloWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Modulo
        fields="__all__"

class MaterialSerializer(serializers.ModelSerializer):
    modulo = ModuloSerializer()
    class Meta:
        model=Material
        fields="__all__"

class MaterialWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Material
        fields="__all__"

class HorarioWriteSerializer(serializers.ModelSerializer):
    class Meta:
        model=Horario
        fields="__all__"

class HorarioSerializer(serializers.ModelSerializer):
    curso = CursoSerializer()
    class Meta:
        model=Horario
        fields="__all__"

