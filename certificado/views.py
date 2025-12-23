from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from io import BytesIO
from curso.models import Inscripcion
from datetime import date
from rest_framework.permissions import IsAuthenticated



def nombre_completo(profile):
    return " ".join(filter(None, [
        profile.nombre,
        profile.apellidoPaterno,
        profile.apellidoMaterno
    ]))


class CertificadoPDFView(APIView):
    [IsAuthenticated]

    def get(self, request, id):
        inscripcion = Inscripcion.objects.get(pk=id)

        if inscripcion.estado != "Aprobado":
            return Response({"error": "El curso no está aprobado"}, status=400)

        alumno_nombre = nombre_completo(inscripcion.alumno.usuario)
        docente_nombre = nombre_completo(inscripcion.curso.docente.usuario)

        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=A4)
        width, height = A4

        azul = HexColor("#003366")
        azul_claro = HexColor("#0099ff")

        # 🔲 Marcos
        p.setStrokeColor(azul)
        p.setLineWidth(3)
        p.rect(1.5*cm, 1.5*cm, width-3*cm, height-3*cm)
        p.setLineWidth(1)
        p.rect(2*cm, 2*cm, width-4*cm, height-4*cm)

        # 🏷️ Encabezado
        p.setFont("Helvetica-Bold", 26)
        p.setFillColor(azul)
        p.drawCentredString(width/2, height-3.5*cm, "PrevySeg")

        p.setFont("Helvetica", 11)
        p.drawCentredString(width/2, height-4.5*cm, "Organismo Técnico de Capacitación")
        p.drawCentredString(width/2, height-5.2*cm, "Código SENCE: 1237654321")

        p.setStrokeColor(azul_claro)
        p.line(3*cm, height-6*cm, width-3*cm, height-6*cm)

        # 🏆 Título
        p.setFillColor(azul)
        p.setFont("Helvetica-Bold", 24)
        p.drawCentredString(width/2, height-8*cm, "CERTIFICADO DE")
        p.drawCentredString(width/2, height-9.2*cm, "APROBACIÓN")

        p.setFont("Helvetica", 12)
        p.drawCentredString(width/2, height-10.5*cm, "Otorgado a")

        # 👤 Alumno
        p.setFont("Helvetica-Bold", 22)
        p.drawCentredString(width/2, height-12.5*cm, alumno_nombre)

        # 📄 Cuerpo
        styles = getSampleStyleSheet()
        cuerpo = ParagraphStyle(
            'cuerpo',
            parent=styles['Normal'],
            fontSize=13,
            alignment=TA_CENTER,
            leading=22
        )

        texto = f"""
        Por haber completado satisfactoriamente el curso de<br/><br/>
        <b>{inscripcion.curso.nombre}</b>
        """

        paragraph = Paragraph(texto, cuerpo)
        paragraph.wrapOn(p, width-6*cm, height)
        paragraph.drawOn(p, 3*cm, height-18*cm)

        # 📊 Datos
        y = height-21*cm
        p.setFont("Helvetica", 12)
        p.drawCentredString(width/4, y, "Duración")
        p.drawCentredString(3*width/4, y, "Fecha")

        p.setFont("Helvetica-Bold", 14)
        p.drawCentredString(width/4, y-1*cm, f"{inscripcion.curso.horas} horas")
        p.drawCentredString(3*width/4, y-1*cm, date.today().strftime("%d/%m/%Y"))

        # ✍️ Firmas
        y_firma = height-24*cm
        p.line(4*cm, y_firma, width/2-2*cm, y_firma)
        p.line(width/2+2*cm, y_firma, width-4*cm, y_firma)

        p.setFont("Helvetica", 11)
        p.drawCentredString(width/4, y_firma-0.8*cm, "Director Académico")
        p.drawCentredString(width/4, y_firma-1.4*cm, "PrevySeg OTEC")

        p.drawCentredString(3*width/4, y_firma-0.8*cm, docente_nombre)
        p.drawCentredString(3*width/4, y_firma-1.4*cm, "Docente del Curso")

        # 🔢 Footer
        p.setFont("Helvetica", 9)
        p.drawCentredString(width/2, 3*cm, f"Certificado N° CERT-{inscripcion.id:06d}")
        p.drawCentredString(width/2, 2.3*cm, "Santiago, Chile - www.prevyseg.cl")

        p.showPage()
        p.save()

        buffer.seek(0)
        return HttpResponse(buffer, content_type="application/pdf")


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
