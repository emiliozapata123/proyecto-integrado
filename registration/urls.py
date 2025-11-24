from django.urls import path
from .views import CustomTokenObtainPairView,DocenteView,AlumnoView,AlumnoInscripcionView,CertificadoEstudianteView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("docente/list/",DocenteView.as_view(),name="docentes"),
    path("docente/form/",DocenteView.as_view(),name="docentes"),
    path("docente/<int:id>/detail",DocenteView.as_view(),name="docente-detail"),
    path("estudiantes/list",AlumnoView.as_view(),name="alumno-list"),
    path("estudiante/<int:id>/detail",AlumnoView.as_view(),name="alumno-detail"),
    path("estudiante/inscripciones/",AlumnoInscripcionView.as_view(),name="alumno-inscripciones"),
    path("certificados/estudiante/",CertificadoEstudianteView.as_view(),name="certificado-estudiante"),
    
    
]
