const ModuloList = ({modulo, context, setMostrarModal}) => {
    return (
        <tr>
            <td className="fw-semibold">{modulo.titulo}</td>

            <td className="text-muted">
                {modulo.descripcion}
            </td>

            <td>
                <span className="badge bg-primary">{modulo.orden}</span>
            </td>

            <td className="text-end">
                {context === "modulo" ? (
                    <>
                    <button 
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={()=> setMostrarModal("edit")}
                    >
                        <i className="bi bi-pencil"></i>
                    </button>

                    <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={()=> setMostrarModal("delete")}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                    </>
                ):context === "material" ? (
                    <>
                        <button 
                            className="btn btn-sm btn-outline-primary me-1"
                            onClick={() => setMostrarModal("form")}
                        >
                            <i className="bi bi-folder2-open"></i> Añadir Material
                        </button>
                        <button className="btn btn-outline-primary btn-sm" onClick={()=> setMostrarModal("list")}>
                            <i className="bi bi-eye me-1"></i> Ver Material
                        </button>
                    </>
                ):""}
            </td>
        </tr>
    )
}
export default ModuloList;


