import { useState } from "react";
import MaterialModulo from "./MaterialModulo";

const ModulosCurso = ({ cerrar, modulos, materiales, verMaterial }) => {
    const [moduloActivo, setModuloActivo] = useState(null);

    return (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content rounded-4 border-0 shadow">

                    <div className="modal-header">
                        <h5 className="modal-title fw-semibold">
                            <i className="bi bi-journal-bookmark me-2"></i>
                            Módulos del Curso
                        </h5>
                        <button className="btn-close" onClick={cerrar}></button>
                    </div>

                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-4 border-end">
                                <h6 className="fw-semibold mb-3">Módulos</h6>

                                <ul className="list-group">
                                    {modulos.map(modulo => (
                                        <li
                                            key={modulo.id}
                                            className={`list-group-item list-group-item-action
                                                ${moduloActivo?.id === modulo.id ? "active" : ""}`}
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {setModuloActivo(modulo); verMaterial(modulo.id)}}
                                        >
                                            {modulo.titulo}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ===== COLUMNA MATERIALES ===== */}
                            {moduloActivo && <MaterialModulo materiales={materiales} modulo={moduloActivo}/>}

                        </div>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-outline-secondary" onClick={cerrar}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModulosCurso;

