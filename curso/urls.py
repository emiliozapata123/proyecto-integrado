from django.urls import path
from .views import CursoView,PreInscripcionView,InscripcionView,CursoPublicView,CursoDetailView,AsignarCursosDocente

urlpatterns = [
    path("curso/list/",CursoPublicView.as_view(),name="cursos"),
    path("curso/<int:id>/detail/",CursoDetailView.as_view(),name="curso-detail"),
    path("curso/<int:id>/delete/",CursoView.as_view(),name="curso-delete"),
    path("curso/form/",CursoView.as_view(),name="curso-form"),
    path("curso/docente/list",CursoView.as_view(),name="curso-docente-list"),
    path("preinscripcion/form",PreInscripcionView.as_view(),name="preinscripcion"),
    path("preinscripcion/list",PreInscripcionView.as_view(),name="preinscripcion-list"),
    path("preinscripcion/<int:id>/aprobar",InscripcionView.as_view(),name="aprobar-preinscripcion"),
    path("curso/docente/<int:id>/asignar",AsignarCursosDocente.as_view(),name="asignar-cursos-docente"),
]

