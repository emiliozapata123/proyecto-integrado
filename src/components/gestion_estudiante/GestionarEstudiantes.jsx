const GestionarEstudiantes = ({curso,setVerEstudiantes}) => {
    console.log("estudiante: ", curso)
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


                    <div className="d-flex justify-content-center gap-3">
                        <button className="btn btn-primary w-100" onClick={setVerEstudiantes}>
                            <i className="bi bi-people me-2"></i>
                            Ver Estudiantes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}
export default GestionarEstudiantes;

// carrera smith: educacion fisica