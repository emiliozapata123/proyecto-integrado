const InfoDocente = ({docente}) => {
    return (
        <div class="row g-3">
            <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">Nombre completo</label>
                <p class="mb-0 form-control">{docente.nombre} {docente.apellido}</p>
            </div>

            <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">RUT</label>
                <p class="mb-0 form-control">{docente.rut}</p>
            </div>

            <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">Correo electrónico</label>
                <p class="mb-0 form-control form-text-display">{docente.email}</p>
            </div>

            <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">Teléfono</label>
                <p class="mb-0 form-control">{docente.telefono}</p>
            </div>

           
            <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">Especialidad</label>
                <p class="mb-0 form-control">{docente.especialidad}</p>
            </div>

            {/* <div class="col-md-6">
                <label class="fw-semibold text-muted mb-1">Estado</label>
                {docente.inscripciones.map(i => (
                    inscripcionStatus(i.estado)
                ))}
            </div> */}
        </div>
    )
}
export default InfoDocente;