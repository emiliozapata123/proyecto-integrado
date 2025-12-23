const InfoEstudiante = ({estudiante}) => {
    const inscripcionStatus = (estado) => {
        if (estado === "aprobado") {
            return <span className="badge bg-success">Aprobado</span>
        } else if (estado === "pendiente") {
            return <span className="badge bg-warning text-dark">Pendiente</span>
        } else {
            return <span className="badge bg-danger">Rechazado</span>
        }
    }
    
    return (
        <div className="row g-3">
            <div className="col-md-6">
                <label className="fw-semibold text-muted mb-1">Nombre completo</label>
                <p className="mb-0 form-control">{estudiante.nombre} {estudiante.apellido}</p>
            </div>

            <div class="col-md-6">
                <label className="fw-semibold text-muted mb-1">RUT</label>
                <p className="mb-0 form-control">{estudiante.rut}</p>
            </div>

            <div class="col-md-6">
                <label className="fw-semibold text-muted mb-1">Correo electrónico</label>
                <p className="mb-0 form-control form-text-display">{estudiante.email}</p>
            </div>

            <div class="col-md-6">
                <label className="fw-semibold text-muted mb-1">Teléfono</label>
                <p className="mb-0 form-control">{estudiante.telefono}</p>
            </div>

            <div class="col-md-6">
                <label className="fw-semibold text-muted mb-1">Dirección</label>
                <p className="mb-0 form-control">{estudiante.direccion}</p>
            </div>

            <div class="col-md-6">
                <label className="fw-semibold text-muted mb-1">Fecha de Nacimiento</label>
                <p className="mb-0 form-control">{estudiante.fechaNacimiento}</p>
            </div>

            <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">Fecha de Inscripcion</label>
                    <p className="mb-0 form-control">{estudiante.fechaInscripcion}</p>
            </div>

        </div>
    )

}
export default InfoEstudiante;