from django.urls import path
from .views import CustomTokenObtainPairView,DocenteView,AlumnoView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path("docente/list/",DocenteView.as_view(),name="docentes"),
    path("docente/form/",DocenteView.as_view(),name="docentes"),
    path("docente/<int:id>/detail",DocenteView.as_view(),name="docente-detail"),
    path("alumno/list",AlumnoView.as_view(),name="alumno-list"),
    path("alumno/<int:id>/detail",AlumnoView.as_view(),name="alumno-detail"),

    
]
