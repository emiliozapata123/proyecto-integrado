const ListaInscripciones = ({ inscripcion, mostrarModal, addInscripcion}) => {

    return (
        <tr>
            <td>
                {inscripcion.nombre} {inscripcion.apellido}
            </td>
            <td>{inscripcion.apellidoPaterno} {inscripcion.apellidoMaterno}</td>
            <td>{inscripcion.rut}</td>
           
            <td>
                <div className="text-muted small">{inscripcion.correo || "—"}</div>  
            </td>
            <td>{inscripcion.telefono}</td>
            <td>{inscripcion.direccion}</td>
            
            <td>{inscripcion.cursoInteres ? inscripcion.cursoInteres?.nombre:"Sin Curso"}</td>
            <td>{inscripcion.fechaPostulacion}</td>
            <td>
            {inscripcion.estado === "Aprobado" && (
                <span className="badge bg-success">Aprobado</span>
            )}
            {inscripcion.estado === "Pendiente" && (
                <span className="badge bg-warning text-dark">Pendiente</span>
            )}
            {inscripcion.estado === "Rechazado" && (
                <span className="badge bg-danger">Rechazado</span>
            )}
            </td>
            <td className="text-end">
                <div className="btn-group">
                    <button className="btn btn-success btn-sm me-2" onClick={()=> addInscripcion(inscripcion.id,{"estado":"Aprobado"})}>
                        Aprobar
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={()=> addInscripcion(inscripcion.id,{"estado":"Rechazado"})}>
                        Rechazar
                    </button>
                </div>
            </td>
        </tr>
    );
};
export default ListaInscripciones;
