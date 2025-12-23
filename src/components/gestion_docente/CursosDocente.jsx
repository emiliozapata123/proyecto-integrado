const CursosDocente = ({curso}) => {
    return (
        <div className="p-3 bg-white rounded-4 border">
            <div className="d-flex justify-content-between align-items-center">
                <h6 className="text-muted">{curso.nombre}</h6>
            </div>
        </div>
    )
}
export default CursosDocente;