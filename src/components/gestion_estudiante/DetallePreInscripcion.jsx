const DetallePreInscripcion = ({mostrarModal,inscripcion,addInscripcion}) => {
    const inscripcionStatus = (estado) => {
        if (estado === "Aprobado") {
            return <span className="badge bg-success">Aprobado</span>
        } else if (estado === "Pendiente") {
            return <span className="badge bg-warning text-dark">Pendiente</span>
        } else {
            return <span className="badge bg-danger">Rechazado</span>
        }
    }

    return (
        <>
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content border-0 shadow rounded-4">

                    <div className="modal-header border-0">
                        <h5 className="modal-title fw-bold">Detalle de Preinscripción</h5>
                        <button type="button" className="btn-close" onClick={() => mostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <div className="row g-3">

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">Nombre completo</label>
                                <p className="mb-0 form-control">{inscripcion.nombre} {inscripcion.apellido}</p>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">RUT</label>
                                <p className="mb-0 form-control">{inscripcion.rut}</p>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">Correo electrónico</label>
                                <p className="mb-0 form-control">{inscripcion.correo}</p>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">Teléfono</label>
                                <p className="mb-0 form-control">{inscripcion.telefono}</p>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">Dirección</label>
                                <p className="mb-0 form-control">{inscripcion.direccion}</p>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">Curso</label>
                                <p className="mb-0 form-control">
                                {inscripcion.curso ? inscripcion.curso.nombre : "Sin Curso"}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold text-muted mb-1">Fecha de Postulacion</label>
                                <p className="mb-0 form-control">{inscripcion.fechaPostulacion}</p>
                            </div>

                            <div className="col-md-12">
                                <label className="fw-semibold text-muted mb-1">Estado</label><br />
                                {inscripcionStatus(inscripcion.estado)}
                            </div>
                        </div>
                    </div>

                    <div className="modal-footer border-0 d-flex justify-content-end gap-2">
                        <button
                        className="btn btn-outline-danger"
                        onClick={() => addInscripcion(inscripcion.id, { estado: "Rechazado" })}
                        >
                        Rechazar
                        </button>

                        <button
                        className="btn btn-success"
                        onClick={() => addInscripcion(inscripcion.id)}
                        >
                        Aprobar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default DetallePreInscripcion;