import { useState } from "react";
import InfoDocente from "./InfoDocente";
import CursosDocente from "./CursosDocente";

const DetalleDocente = ({docente,mostrarModal,loading}) => {
    const [tab,setTab] = useState("info");

    return (
        <div class="modal fade show d-block" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow rounded-4">
                    <div class="modal-header border-0">
                        <div>
                            <h5 class="modal-title fw-bold">Detalles del Docente</h5>
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
                                    tab === "info" ? "btn-dark p-2 text-white" : "btn-light"
                                    }`}
                                    onClick={() => setTab("info")}
                                >
                                    Información
                                </button>
                                <button
                                    className={`btn rounded-pill flex-fill w-100 ${
                                    tab === "cursos" ? "btn-dark p-2 text-white" : "btn-light"
                                    }`}
                                    onClick={() => setTab("cursos")}
                                >
                                    Cursos
                                </button>
                            </div>
                            {tab === "info" && <InfoDocente docente={docente}/> }
                            {tab === "cursos" && (
                                <div className="text-center text-muted py-3 student-layout">
                                    {docente.cursos?.map(c => (
                                        <CursosDocente key={c.id} curso={c} />
                                    ))}
                                </div>
                            )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DetalleDocente;