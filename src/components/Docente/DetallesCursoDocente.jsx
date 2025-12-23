import { useState } from "react";

const DetallesCursoDocente = ({docente,loading,mostrarModal}) => {
    const [tab, setTab] = useState("modulos");

    return (
        <div class="modal fade show d-block" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow rounded-4">
                    <div class="modal-header border-0">
                        <div>
                            <h5 class="modal-title fw-bold">Detalles del Estudiante</h5>
                            <p>Informacion completa y cursos del docente</p>
                        </div>
                        <button type="button" class="btn-close" onClick={()=> mostrarModal(false)}></button>
                    </div>
                    <div class="modal-body pt-3">
                        {loading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-dark" role="status"></div>
                        </div>
                        ) : (
                            <>
                            <div className="d-flex justify-content-around bg-light rounded-pill p-1 mb-4">
                                <button
                                    className={`btn rounded-pill flex-fill w-100 ${
                                    tab === "modulos" ? "btn-dark p-2 text-white" : "btn-light"
                                    }`}
                                    onClick={() => setTab("modulos")}
                                >
                                    Modulos
                                </button>
                                <button
                                    className={`btn rounded-pill flex-fill w-100 ${
                                    tab === "estudiantes" ? "btn-dark p-2 text-white" : "btn-light"
                                    }`}
                                    onClick={() => setTab("estudiantes")}
                                >
                                    Estudiantes
                                </button>
                                <button
                                    className={`btn rounded-pill flex-fill w-100 ${
                                    tab === "material" ? "btn-dark p-2 text-white" : "btn-light"
                                    }`}
                                    onClick={() => setTab("material")}
                                >
                                    Material
                                </button>
                                <button
                                    className={`btn rounded-pill flex-fill w-100 ${
                                    tab === "tareas" ? "btn-dark p-2 text-white" : "btn-light"
                                    }`}
                                    onClick={() => setTab("tareas")}
                                >
                                    Tareas
                                </button>
                            </div>
                            {/* {tab === "info" && <InfoDocente docente={docente}/> }
                            {tab === "cursos" && (
                                <div className="text-center text-muted py-3 student-layout">
                                    {docente.cursos?.map(c => (
                                        <CursosDocente key={c.id} curso={c} />
                                    ))}
                                </div>
                            )} */}
                            </>
                        )}
                    </div>
                    <div class="modal-footer border-0 d-flex justify-content-end gap-2">
                        <button class="btn btn-outline-dark">Rechazar</button>
                        <button class="btn btn-dark">Aprobar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetallesCursoDocente;