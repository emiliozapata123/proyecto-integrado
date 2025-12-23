import { useState } from "react";

const HORA_MIN = "08:00";
const HORA_MAX = "18:00";

const AgregarHorario = ({ dia, addHorario, onCancelar }) => {
    const [horaInicio, setHoraInicio] = useState("");
    const [horaFin, setHoraFin] = useState("");
    const [error, setError] = useState("");

    const validar = () => {
        if (!horaInicio || !horaFin) {
            setError("Debe completar ambas horas");
            return false;
        }

        if (horaInicio < HORA_MIN || horaFin > HORA_MAX) {
            setError("El horario debe estar entre 08:00 y 18:00");
            return false;
        }

        if (horaFin <= horaInicio) {
            setError("La hora fin debe ser mayor que la hora inicio");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validar()) return;

        const horario = {
            dia,
            hora_inicio:horaInicio,
            hora_fin:horaFin
        }

        addHorario(horario);
        onCancelar();
    };

    return (
        <form onSubmit={handleSubmit} className="border rounded-3 p-2 mt-2 bg-light">
            <h6 className="fw-semibold mb-3 text-center">
                Agregar horario - {dia}
            </h6>
            <div className="mb-2">
                <label className="form-label small">Hora inicio</label>
                <input
                    type="time"
                    className="form-control"
                    min={HORA_MIN}
                    max={HORA_MAX}
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                />
            </div>
            <div className="mb-2">
                <label className="form-label small">Hora fin</label>
                <input
                    type="time"
                    className="form-control"
                    min={HORA_MIN}
                    max={HORA_MAX}
                    value={horaFin}
                    onChange={(e) => setHoraFin(e.target.value)}
                />
            </div>

            {error && (
                <div className="alert alert-danger py-1 small mt-2">
                    {error}
                </div>
            )}

            <div className="d-flex gap-2 mt-3">
                <button type="submit" className="btn btn-primary btn-sm w-100">
                    Guardar
                </button>
                <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm w-100"
                    onClick={onCancelar}
                >
                    Cancelar
                </button>
            </div>
        </form>
    );
};

export default AgregarHorario;
