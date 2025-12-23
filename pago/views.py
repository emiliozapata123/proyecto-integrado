from django.shortcuts import render,redirect
from rest_framework.views import APIView
from registration.models import Alumno
from curso.models import Curso, Inscripcion
from rest_framework.response import Response
from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.options import WebpayOptions
from transbank.common.integration_type import IntegrationType

# Create your views here.

class IniciarPagoView(APIView):
    def post(self,request):
        try:
            alumno = request.user.profile.alumno
            curso_id = request.data.get("curso_id")
            
            curso = Curso.objects.get(pk=curso_id)
            if curso.cupo == 0:
                return Response({"error":"no hay cupo"},status=400)
            
            total = float(curso.precio)
            
            buy_order = f"orden-{alumno.id}-{curso.id}"
            session_id = str(alumno.id)
            return_url = request.build_absolute_uri("/pago/confirmar/")

            options = WebpayOptions(
                commerce_code="597055555532",
                api_key="579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
                integration_type=IntegrationType.TEST
            )

            tx = Transaction(options)

            response = tx.create(
                buy_order=buy_order,
                session_id=session_id,
                amount=total,
                return_url=return_url
            )

            return Response({
                "url": response["url"],
                "token": response["token"]
            })

        except Exception as e:
            return 
        
class ConfirmarPagoView(APIView):
    def get(self, request):
        try:
            token = request.GET.get("token_ws")

            options = WebpayOptions(
                commerce_code="597055555532",
                api_key="579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C",
                integration_type=IntegrationType.TEST
            )

            tx = Transaction(options)
            response = tx.commit(token)

            if response["status"] == "AUTHORIZED":
                buy_order = response["buy_order"]
                alumno_id,curso_id = buy_order.split("-")[1:]
                alumno = Alumno.objects.get(pk=alumno_id)
                curso = Curso.objects.get(pk=curso_id)
                inscripcion = Inscripcion.objects.filter(alumno=alumno,curso=curso).first()
                if inscripcion and inscripcion.estado in ["En progreso","Aprobado","Reprobado"]:
                    return redirect(f"http://localhost:3000/pago-denegado/")
                
                if inscripcion and inscripcion.estado == "Pendiente":
                    inscripcion.estado = "En progreso"
                    inscripcion.save()
                    return redirect(f"http://localhost:3000/pago-exitoso/?token_ws={token}")

                Inscripcion.objects.create(
                    alumno=alumno,
                    curso=curso,
                    estado="En progreso"
                )
                curso.cupo -=1
                curso.save()

                return redirect(f"http://localhost:3000/pago-exitoso/?token_ws={token}")
               
            return Response({
                "status": "failed",
                "mensaje": f"Pago rechazado ({response['status']})"
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)


""" 
Tarjetas
| Tipo                 | Número de tarjeta  | Fecha Exp.        | CVV    | Resultado esperado |
| -------------------- | ------------------ | ----------------- | ------ | ------------------ |
| **Visa**             | `4051885600446623` | Cualquiera futura | `123`  | **Autorizado**     |
| **MasterCard**       | `5186059559590568` | Cualquiera futura | `123`  | **Autorizado**     |
| **American Express** | `373118137707208`  | Cualquiera futura | `1234` | **Autorizado**     |
| **Discover**         | `6011000991300009` | Cualquiera futura | `123`  | **Autorizado**     |
| **Diners Club**      | `305278293371283`  | Cualquiera futura | `123`  | **Autorizado**     |


| Tipo                     | Número de tarjeta  | Resultado esperado |
| ------------------------ | ------------------ | ------------------ |
| **Visa (rechazo)**       | `5186059559590569` | **Rechazado**      |
| **MasterCard (rechazo)** | `5186059559590567` | **Rechazado**      |


Datos autenticacion
| Campo     | Valor          |
| --------- | -------------- |
| **RUT**   | `11.111.111-1` |
| **Clave** | `123`          |
"""   
        