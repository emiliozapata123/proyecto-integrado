const AvailableCourses = ({course, pagarCurso}) => {
    return (
        <div className="col-md-4" key={course.id}>
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">

                <div 
                    className="p-4 text-white"
                    style={{ background: "linear-gradient(135deg, #004e92, #000428)" }}
                >
                    <span className="badge bg-light text-dark">{course.categoria}</span>
                </div>

                <div className="card-body">

                    <h5 className="fw-bold">{course.nombre}</h5>
                    <p className="text-muted mb-1">{!course.docente ? "Sin Docente": `Por ${course.docente.usuario.nombre}`}</p>

                    <p className="mt-3 text-muted">{course.descripcion}</p>

                    <div className="d-flex align-items-center gap-3 mt-3">
                        <span className="text-muted"><i className="bi bi-clock"></i> {course.horas} horas</span>
                        <span className="text-muted"><i className="bi bi-people"></i> {course.estudiantes} estudiantes</span>
                    </div>

                    <div className="mt-3">
                        <small className="text-muted">Inicio:</small>{" "}
                        <span className="fw-semibold">{course.inicio}</span>
                    </div>

                    <h6 className="mt-3 fw-bold">$ {Number(course.precio).toLocaleString("es-CL")}</h6>

                    <button 
                        className="btn btn-primary w-100 rounded-3 mt-3 d-flex justify-content-center align-items-center gap-2"
                        onClick={()=> pagarCurso(course.id)}
                    >
                        <i className="bi bi-plus-lg"></i>
                        Inscribirse Ahora
                    </button>
                </div>
            </div>
        </div>
    )
}
export default AvailableCourses;