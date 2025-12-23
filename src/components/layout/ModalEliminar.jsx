const ModalEliminar = ({curso,mostrarModal,handleDelete,message}) => {
    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Eliminar {message}</h5>
                        <button type="button" className="btn-close" onClick={()=> mostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-4">
                        ¿Esta seguro de Eliminar {message} de la plataforma?
                        </p>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-dark w-100" onClick={()=> mostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-dark w-100" onClick={()=> handleDelete(curso.id)}>Eliminar {message}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ModalEliminar;