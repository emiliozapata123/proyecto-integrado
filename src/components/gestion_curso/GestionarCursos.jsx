const GestionarCursos = ({mostrarModal,curso,context}) => {
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

                    <p className="mt-3 text-muted">{curso.descripcion}</p>

                    <div className="d-flex align-items-center gap-3 mt-3">
                        <span className="text-muted"><i className="bi bi-clock"></i> {curso.horas} horas</span>
                        <span className="text-muted"><i className="bi bi-people"></i> {curso.inscripciones} estudiantes inscritos</span>
                    </div>

                    {/* <div className="mt-3">
                        <small className="text-muted">Inicio:</small>{" "}
                        <span className="fw-semibold">{curso.inicio}</span>
                    </div> */}

                    <h6 className="mt-3 fw-bold">$ {Number(curso.precio).toLocaleString("es-CL")}</h6>

                    {context === "horario" ? (
                        <button className="btn btn-primary w-100" onClick={()=> mostrarModal(curso.id,"verHorario")}>
                            <i className="bi bi-calendar-event me-3"></i>
                            Ver Horario
                        </button>
                    ):(
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-danger w-100" onClick={()=> mostrarModal(curso.id,"eliminar")}>
                                <i className="bi bi-trash"></i>Eliminar</button>
                            <button className="btn btn-warning w-100" onClick={()=> mostrarModal(curso.id,"editar")}>
                                <i className="bi bi-pencil"></i>Editar
                            </button>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
        // <div className="col">
        //     <div className="card p-3">
        //         <div className="d-flex align-items-start gap-3">
        //             <div className="flex-grow-1">
                        
        //                 <img
        //                 src={`http://127.0.0.1:8000/${curso.imagen}`}
        //                 className="card-img-top img-cover"
        //                 alt={curso.nombre}
        //                 />
        //                 <div className="d-flex align-items-center gap-2">
        //                     <h5 className="mb-0 fw-semibold">{curso.nombre}</h5>
        //                 </div>

        //                 <ul className="list-unstyled text-muted mb-0">
        //                     <li><i class="bi bi-clock"></i> {curso.horas} horas</li>
        //                     <li><i className="bi bi-ticket"></i> {curso.cupo} cupos</li>
        //                     <li><i className="bi bi-person"></i>{!curso.docente?.usuario ? " Sin docente asignado": `Docente: ${curso.docente.usuario.nombre}`}</li>
        //                 </ul>
        //             </div>
        //         </div>

        //         <hr className="my-3" />

        //         <div className="d-flex justify-content-center gap-3">
        //             {/* <button className="btn btn-dark w-100">Ver Detalles</button> */}
        //             <button className="btn btn-danger w-100" onClick={()=> mostrarModal(curso.id,"eliminar")}>
        //                 <i className="bi bi-trash"></i>Eliminar</button>
        //             <button className="btn btn-warning w-100" onClick={()=> mostrarModal(curso.id,"editar")}>
        //                 <i className="bi bi-pencil"></i>Editar
        //             </button>
        //         </div>
        //     </div>
        // </div>
    )
}
export default GestionarCursos;