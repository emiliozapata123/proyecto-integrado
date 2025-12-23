const CertificadoList = ({cert}) => {
    return (
        <div className="row bg-white p-4 rounded-4 shadow-sm mb-4">
            
            <div className="col-md-4 d-flex flex-column align-items-center justify-content-center bg-primary text-white rounded-4 p-4">
                <i className="bi bi-award fs-1"></i>
                <h5 className="mt-3">Certificado de</h5>
                <h4 className="fw-bold">Completación</h4>
            </div>

            <div className="col-md-8 p-4">
                <h4 className="fw-bold">{cert.curso?.nombre}</h4>
                <p className="text-muted">
                    Docente: {cert.docente?.nombre} {cert.docente?.apellido}
                </p>
                <p className="text-muted">
                    Código: CERT-{new Date().getFullYear()}-{String(cert.id).padStart(6, "0")}
                </p>

                <p className="fw-semibold mt-3 mb-1">Fecha de Completación</p>
                <p>{cert?.fecha}</p>

                <p className="fw-semibold mt-3 mb-2">Competencias Adquiridas:</p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                    <span className="badge bg-info text-dark">Identificación de Riesgos</span>
                    <span className="badge bg-info text-dark">Medidas Preventivas</span>
                    <span className="badge bg-info text-dark">Normativa Legal</span>
                </div>

                <div className="d-flex gap-2 mt-3">
                    <a 
                        href={`http://127.0.0.1:8000/inscripcion/certificado/${cert.id}/generar/`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary"
                    >
                        <i className="bi bi-download"></i> Descargar PDF
                    </a>

                </div>
            </div>
        </div>
    )

}
export default CertificadoList;