const MyCourses = ({curso, verHorario, pagarCurso, verCurso }) => {
    const perfil = sessionStorage.getItem("perfil");

    return (
        <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div 
                    className="p-4 text-white"
                >
                    <img
                    src={`http://127.0.0.1:8000/${curso.imagen}`}
                    className="card-img-top img-cover"
                    alt={curso.nombre}
                    />
                    <span className="badge bg-light text-dark">{curso.categoria}</span>
                </div>

                <div className="card-body">

                    <h5 className="fw-bold">{curso.nombre}</h5>
                    <p className="text-muted mb-1">{!curso.docente ? "Sin Docente": `Por ${curso.docente}`}</p>

                    <div className="d-flex align-items-center gap-3 mt-3 mb-2">
                        <span className="text-muted"><i className="bi bi-clock"></i> {curso.horas} horas</span>
                        <span className="text-muted"><i className="bi bi-people"></i> {curso.inscripciones} estudiantes inscritos</span>
                    </div>

                    {/* <div className="mt-3">
                        <small className="text-muted">Inicio:</small>{" "}
                        <span className="fw-semibold">{curso.inicio}</span>
                    </div> */}

                    {curso.estado === "Pendiente" ? (
                        <button className="btn btn-primary w-100" onClick={() => pagarCurso(curso.id)}>
                            Realizar Pago
                        </button>
                    ):((perfil === "Docente" || perfil === "Administrador") ? 
                        <button className="btn btn-outline-secondary w-100" onClick={verHorario}>
                            <i className="bi bi-calendar-event me-2"></i>
                            Ver Horario
                        </button>:
                        
                        <div className="d-flex gap-2">
                            <button className="btn btn-primary w-50" onClick={verCurso}>
                                <i className="bi bi-journal-bookmark me-2"></i>
                                Ver Curso
                            </button>

                            <button className="btn btn-outline-secondary w-50" onClick={verHorario}>
                                <i className="bi bi-calendar-event me-2"></i>
                                Ver Horario
                            </button>
                        </div>
                        
                    )}
                </div>
            </div>
        </div>           
    )
}
export default MyCourses;
                    