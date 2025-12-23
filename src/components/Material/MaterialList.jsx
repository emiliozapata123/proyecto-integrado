const MaterialList = ({ materiales, setMostrarModal }) => {
    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content p-3 rounded-4 shadow">
                    
                    <div className="modal-header border-0">
                        <h5 className="modal-title">Materiales del Módulo</h5>
                        <button className="btn-close" onClick={()=> setMostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        {materiales.length === 0 ? (
                            <p className="text-muted text-center">No hay materiales cargados.</p>
                        ) : (
                            <ul className="list-group">
                                {materiales.map(m => (
                                    <li key={m.id} className="list-group-item d-flex justify-content-between">
                                        <div>
                                            <strong>{m.titulo}</strong><br />
                                            <span className="text-muted">{m.tipo}</span>
                                            <p className="text-muted">{m.descripcion}</p>
                                        </div>
                                        {/* <div className="d-flex gap-2">
                                            <a className="btn btn-primary btn-sm" href={m.link || m.archivo} target="_blank">
                                                Ver
                                            </a>
                                        </div> */}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default MaterialList;
