const CursosEstudiante = ({curso}) => {
    const inscripcionStatus = (estado) => {
        if (estado === "Aprobado") {
            return <span className="badge bg-success">Aprobado</span>
        } else if (estado === "Pendiente") {
            return <span className="badge bg-warning text-dark">Pendiente</span>
        } else if (estado === "Rechazado"){
            return <span className="badge bg-danger">Rechazado</span>
        } else {
            return <span className="badge bg-primary">En progreso</span>
        }
    }

    return (
        <div className="p-3 bg-white rounded-4 border">
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-muted">{curso.nombre}</h6>
                {inscripcionStatus(curso.estado)}
            </div>
        </div>
    )
}
export default CursosEstudiante;