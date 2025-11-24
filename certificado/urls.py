from django.urls import path
from .views import CertificadoPDFView

urlpatterns = [
    path("certificado/<int:id>/generar/",CertificadoPDFView.as_view(),name="cursos"),

]

