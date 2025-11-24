# Create your views here.
# curso/views.py
from django.shortcuts import redirect
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import APIView
from curso.models import Inscripcion
from django.core.files.base import ContentFile
from .models import Certificado
from django.template.loader import get_template
from django.http import HttpResponse
from xhtml2pdf import pisa
from django.core.files.base import ContentFile
from io import BytesIO

class CertificadoPDFView(APIView):
    def get(self, request, id):
        
        inscripcion = Inscripcion.objects.get(pk=id)

        if inscripcion.estado != "Aprobado":
            return Response({"error": "El curso no está aprobado"}, status=400)
        
        # if hasattr(inscripcion, "certificado"):
        #     return redirect(inscripcion.certificado.certificado.url)

        template = get_template("certificados/certificado.html")
        html = template.render({"inscripcion": inscripcion})

        result = BytesIO()
        pdf = pisa.pisaDocument(BytesIO(html.encode("UTF-8")), dest=result)

        if pdf.err:
            return Response({"error": "Error generando PDF"}, status=500)

        filename = f"certificado_{inscripcion.id}.pdf"

        certificado = Certificado.objects.create(inscripcion=inscripcion)
        certificado.certificado.save(filename, ContentFile(result.getvalue()))

        response = HttpResponse(result.getvalue(), content_type="application/pdf")
        response['Content-Disposition'] = f'inline; filename={filename}'
        return response

                      

# class GenerarCertificadoView(APIView):
#     def post(self, request, id):
#         try:
#             inscripcion = Inscripcion.objects.get(pk=id)

#             # Validar que esté aprobado
#             if inscripcion.estado != "Aprobado":
#                 return Response({"error": "El curso aún no está aprobado."}, status=400)

#             # Si ya existe certificado, devolverlo
#             if hasattr(inscripcion, "certificado"):
#                 return Response({"mensaje": "Ya existe certificado"}, status=200)

#             alumno = f"{inscripcion.alumno.usuario.nombre} {inscripcion.alumno.usuario.apellido}"
#             curso = inscripcion.curso.nombre
#             horas = inscripcion.curso.horas
#             fecha = datetime.now().strftime("%d/%m/%Y")

#             html_string = render_to_string("certificados/certificado.html", {
#                 "alumno": alumno,
#                 "curso": curso,
#                 "horas": horas,
#                 "fecha": fecha,
#                 "firma_url": settings.STATIC_ROOT + "/firma.png",
#             })

#             pdf = HTML(string=html_string).write_pdf()

#             file_name = f"certificado_{inscripcion.id}.pdf"

#             certificado = Certificado.objects.create(inscripcion=inscripcion)
#             certificado.archivo.save(file_name, ContentFile(pdf))

#             return Response({
#                 "mensaje": "Certificado generado correctamente",
#                 "archivo_url": certificado.archivo.url
#             })

#         except Exception as e:
#             return Response({"error": str(e)}, status=500)
