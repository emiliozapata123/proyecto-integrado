from django.urls import path
from .views import CursoView,PreInscripcionView,InscripcionView,CursoPublicView,CursoDetailView,AsignarCursosDocente,AprobarCursoView,CursoDisponibleAlumnoView,ModuloView,MaterialView,CursoEstudianteView,HorarioView


urlpatterns = [
    path("curso/list/",CursoPublicView.as_view(),name="cursos"),
    path("curso/estudiante/list/",CursoEstudianteView.as_view()),
    path("curso/<int:id>/detail/",CursoDetailView.as_view(),name="curso-detail"),
    path("curso/<int:id>/delete/",CursoView.as_view(),name="curso-delete"),
    path("curso/disponible/alumno/",CursoDisponibleAlumnoView.as_view()),
    path("curso/form/",CursoView.as_view()),
    path("curso/<int:id>/update/",CursoView.as_view()),
    path("curso/docente/list/",CursoView.as_view(),name="curso-docente-list"),
    path("preinscripcion/form/",PreInscripcionView.as_view(),name="preinscripcion"),
    path("preinscripcion/list",PreInscripcionView.as_view(),name="preinscripcion-list"),
    path("preinscripcion/<int:id>/aprobar",InscripcionView.as_view(),name="aprobar-preinscripcion"),
    path("curso/docente/<int:id>/asignar",AsignarCursosDocente.as_view(),name="asignar-cursos-docente"),
    path("curso/<int:id>/aprobar/",AprobarCursoView.as_view(),name="curso-aprobar"),
    path("curso/<int:id>/modulo/list/",ModuloView.as_view()),
    path("curso/modulo/<int:id>/form/",ModuloView.as_view()),
    path("curso/modulo/<int:id>/delete/",ModuloView.as_view()),
    path("curso/modulo/<int:modulo_id>/update/",ModuloView.as_view()),
    path("curso/modulo/<int:id>/material/list/",MaterialView.as_view()),
    path("curso/modulo/<int:id>/material/form/",MaterialView.as_view()),
    path("curso/<int:id>/horario/list/",HorarioView.as_view()),
    path("curso/horario/form/",HorarioView.as_view()),
    path("curso/<int:curso_id>/horario/<int:id>/delete/",HorarioView.as_view()),
    path("curso/<int:curso_id>/horario/<int:id>/delete/",HorarioView.as_view()),


]

