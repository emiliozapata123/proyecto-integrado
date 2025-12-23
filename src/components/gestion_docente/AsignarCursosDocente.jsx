import { useEffect, useState } from "react";
import useFetch from "../custom_hook/useFetch";

const AsignarCursosDocente = ({ docente, mostrarModal, addCursoDocente}) => {
    const [cursosAsignados, setCursosAsignados] = useState([]);
    const {data:cursos} = useFetch("/curso/list/");

    useEffect(()=> {
        if (docente.cursos) {
            setCursosAsignados(docente.cursos.map(c => c.id));
        }
    }, [docente]);

    const listadoCursos = cursos.filter(c => cursosAsignados.includes(c.id));
    const cursosOriginales = docente.cursos?.map(c => c.id);
    const cursosFiltrados = cursos.filter(c => !cursosOriginales?.includes(c.id));
    const cursosDisponibles = cursosFiltrados.filter(c => c.docente === null);

    const handleChange = (value) => {
        if (cursosOriginales.includes(value)) return;

        setCursosAsignados(prev => 
            prev.find(id => id === value) ?  prev.filter(id => id !== value):
            [...prev,value]
        );
    }
    
    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">

                <div className="modal-header border-0">
                    <h5 className="modal-title fw-bold">Asignar cursos a {docente?.usuario?.nombre} {docente?.usuario?.apellido}</h5>
                    <button type="button" className="btn-close" onClick={()=> mostrarModal(false)}></button>
                </div>

                <div className="modal-body">
                    <div className="row g-3">

                        <div className="col-12 col-lg-7">
                            <h6 className="fw-semibold mb-2">Cursos disponibles</h6>
                            <div className="panel-scroll border rounded p-2">
                                <ul className="list-group list-group-flush">

                                    {cursosDisponibles.length === 0 && (
                                    <p className="text-center text-muted py-2 mb-0">No hay cursos disponibles</p>
                                    )}

                                    {cursosDisponibles.map(c => (
                                    <li key={c.id} className="list-group-item d-flex align-items-center gap-3">
                                        <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={cursosAsignados.includes(c.id)}
                                        onChange={() => handleChange(c.id)}
                                        />
                                        <div className="flex-grow-1">
                                            <div className="fw-semibold">{c.nombre}</div>
                                            <div className="text-muted small">
                                                {c.categoria || "Sin categoría"} - {c.horas} hrs
                                            </div>
                                        </div>
                                    </li>
                                    ))}

                                </ul>
                            </div>
                        </div>

                        <div className="col-12 col-lg-5">
                            <h6 className="fw-semibold mb-2">Cursos asignados</h6>
                            <div className="panel-scroll border rounded p-1">
                                {docente.cursos?.length === 0 && listadoCursos.length === 0 && (
                                    <p className="text-center text-muted py-2 mb-0">No tiene cursos asignados aún</p>
                                )}
                                <ul className="list-group list-group-flush">
                                    {listadoCursos.map(c => (
                                    <li key={c.id} className="list-group-item d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="flex-grow-1">
                                                <div className="fw-semibold">{c.nombre}</div>
                                                <div className="text-muted small">{c.categoria || "Sin categoría"}</div>
                                            </div>
                                        </div>
                                        {!cursosOriginales.includes(c.id) && (
                                            <button className="btn btn-danger d-flex gap-1 p-1" onClick={() => handleChange(c.id)}>
                                                <i className="bi bi-trash"></i>
                                                Quitar
                                            </button>
                                        )}
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-footer border-0 d-flex justify-content-end">
                    <button className="btn btn-outline-dark" onClick={mostrarModal}>Cancelar</button>
                    <button className="btn btn-dark" onClick={()=> addCursoDocente(docente.id,cursosAsignados)}>Guardar cambios</button>
                </div>

                </div>
            </div>
        </div>
    );
};

export default AsignarCursosDocente;
