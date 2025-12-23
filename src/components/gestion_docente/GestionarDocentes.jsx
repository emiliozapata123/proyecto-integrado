const GestionarDocentes = ({mostrarModal,docente}) => {
    return (
        <div className="col">
            <div className="card p-3">
                <div className="d-flex align-items-start gap-3">
                    <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold"
                    style={{ width: "50px", height: "50px" }}>
                    CR
                    </div>

                    <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2">
                            <h5 className="mb-0 fw-semibold">{docente.nombre}</h5>
                            <span className="badge bg-dark">Activo</span>
                        </div>
                        <p className="text-muted mb-2">{docente.especialidad}</p>

                        <ul className="list-unstyled text-muted mb-0">
                            <li><i className="bi bi-envelope me-2"></i> {docente.email}</li>
                            <li><i className="bi bi-telephone me-2"></i> {docente.telefono}</li>
                            <li><i className="bi bi-book me-2"></i> {docente.cursos} cursos asignados</li>
                        </ul>
                    </div>
                </div>

                <hr className="my-3" />

                <div className="d-flex justify-content-end align-items-center">
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary" onClick={()=> mostrarModal(docente.id,"asignar-curso")}>
                            <i className="bi bi-plus fs-5"></i>
                            Asignar Cursos
                        </button>
                        <button className="btn btn-secondary" onClick={()=> mostrarModal(docente.id,"detalle")}>Ver Perfil</button>
                        {/* <button className="btn btn-warning d-flex gap-1" onClick={()=> mostrarModal(docente.id,"editar")}>
                            <i className="bi bi-pencil"></i>
                            Editar
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GestionarDocentes;