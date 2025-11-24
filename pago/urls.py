from django.urls import path
from .views import IniciarPagoView, ConfirmarPagoView

urlpatterns = [
    path("iniciar/", IniciarPagoView.as_view()),
    path("confirmar/", ConfirmarPagoView.as_view()),
]
