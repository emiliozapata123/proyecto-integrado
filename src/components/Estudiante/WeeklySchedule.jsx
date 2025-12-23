import { useState } from "react";
import BarDays from "./BarDays";

const WeeklySchedule = () => {
    const [dia, setDia] = useState("Lunes");

    const clases = {
        Lunes: [
        {
            id: 1,
            nombre: "Excel Avanzado para Negocios",
            modulo: "Módulo 7: Dashboards",
            hora: "15:00 - 17:00",
            docente: "María González",
            plataforma: "Zoom - Sala Virtual 1",
            modalidad: "Online"
        },
        {
            id: 2,
            nombre: "Marketing Digital",
            modulo: "Módulo 5: Email Marketing",
            hora: "18:00 - 20:00",
            docente: "Ana Torres",
            plataforma: "Google Meet - Sala 3",
            modalidad: "Online"
        }
        ],
        Martes: [{
            id: 2,
            nombre: "Marketing Digital",
            modulo: "Módulo 5: Email Marketing",
            hora: "18:00 - 20:00",
            docente: "Ana Torres",
            plataforma: "Google Meet - Sala 3",
            modalidad: "Online"
        }],
        Miercoles: [],
        Jueves: [],
        Viernes: []
    };

    return (
        <div className="container-fluid px-4 py-4">

        <h4 className="fw-bold">Horario Semanal</h4>
        <p className="text-muted">Tu calendario de clases de la semana</p>

        <BarDays setDia={setDia} dia={dia}/>

        {clases[dia].length === 0 ? (
            <p className="text-muted">No tienes clases este día.</p>
        ) : (
            clases[dia].map((c) => (
            <div key={c.id} className="p-4 bg-white shadow-sm rounded-4 mb-3 border mt-3">

                <div className="d-flex justify-content-between">
                <h5 className="fw-bold">{c.nombre}</h5>
                <span className="badge bg-primary">{c.modalidad}</span>
                </div>

                <p className="text-muted">{c.modulo}</p>

                <div className="row mt-2">
                <div className="col-md-4">
                    <p className="mb-1">
                    <i className="bi bi-clock me-2"></i>
                    {c.hora}
                    </p>
                </div>

                <div className="col-md-4">
                    <p className="mb-1">
                    <i className="bi bi-person me-2"></i>
                    {c.docente}
                    </p>
                </div>

                <div className="col-md-4">
                    <p className="mb-1">
                    <i className="bi bi-camera-video me-2"></i>
                    {c.plataforma}
                    </p>
                </div>
                </div>
            </div>
            ))
        )}
        </div>
    );
};
export default WeeklySchedule;