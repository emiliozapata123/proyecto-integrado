import { useState } from "react";
import AgregarHorario from "./HorarioForm";

const DIAS = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

const VerHorario = ({ curso, horario, context, addHorario, cerrar, mensaje, removeHorario }) => {
    const [formHorario, setFormHorario] = useState(false);
    const perfil = sessionStorage.getItem("perfil");
    
    const horarioPorDia = (dia) =>
        horario.filter(h => h.dia === dia);

    return (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content rounded-4">
                    <div className="modal-header border-0">
                        <div>
                            <h5 className="fw-semibold">Horarios del Curso</h5>
                            <h5 className="text-muted">{curso.nombre}</h5>
                        </div>
                        <button className="btn-close" onClick={cerrar} />
                    </div>
                    {mensaje && (
                        <div className="alert alert-success py-1 small mt-2">
                            {mensaje}
                        </div>
                    )}
                    <div className="modal-body">
                        <div className="row g-3">
                            {DIAS.map(dia => (
                                <div key={dia} className="col">
                                    <div className="border rounded-3 p-3 h-100">
                                        <h6 className="fw-semibold text-center mb-3">
                                            {dia}
                                        </h6>

                                        {horarioPorDia(dia).length === 0 && (
                                            <p className="text-muted small text-center">
                                                Sin horario
                                            </p>
                                        )}

                                        {horarioPorDia(dia).map(h => (
                                            <div
                                                key={h.id}
                                                className="d-flex justify-content-between align-items-center mb-2 p-2 bg-light rounded"
                                            >
                                                <span className="fw-medium">
                                                    {h.hora_inicio.slice(0,5)} - {h.hora_fin.slice(0,5)}
                                                </span>
                                                {perfil === "Administrador" && (
                                                    <button 
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={()=> removeHorario(h.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                        {perfil === "Administrador" && (
                                            <button
                                                className="btn btn-sm btn-outline-primary w-100 mt-2"
                                                onClick={()=> setFormHorario(dia)}
                                            >
                                                + Agregar
                                            </button>
                                        )}

                                        {formHorario === dia && 
                                            <AgregarHorario
                                                dia={dia}
                                                horario={horario}
                                                addHorario={addHorario} 
                                                onCancelar={()=> setFormHorario(false)}
                                            />
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerHorario;
