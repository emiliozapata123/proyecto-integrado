const MaterialModulo = ({materiales, modulo}) => {
    return (
        <div className="col-md-8">
            {!modulo ? (
                <p className="text-muted text-center mt-4">
                    Selecciona un módulo para ver sus materiales
                </p>
            ) : (
                <>
                    <h6 className="fw-semibold mb-2">
                        {modulo.titulo}
                    </h6>

                    <p className="text-muted">
                        {modulo.descripcion}
                    </p>

                    {materiales.length === 0 ? (
                        <p className="text-muted">
                            Este módulo no tiene materiales
                        </p>
                    ) : (
                        <ul className="list-group list-group-flush">
                            {materiales.map(m => (
                                <li
                                    key={m.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <p className="text-muted">
                                        {m.titulo}
                                    </p>
                                    <p className="text-muted">
                                        {m.descripcion}
                                    </p>
                                    {m.tipo === "LINK" &&
                                        <p className="text-muted">
                                            {m.link}
                                        </p>
                                    }

                                    {m.tipo === "OTRO" && (
                                        <a
                                            href={`http://127.0.0.1:8000${m.archivo}`}
                                            target="_blank"
                                            className="btn btn-sm btn-outline-primary"
                                        >
                                            Ver
                                        </a>
                                    )}

                                    {m.url && (
                                        <a
                                            href={m.url}
                                            target="_blank"
                                            className="btn btn-sm btn-outline-success"
                                        >
                                            Abrir
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    )
}
export default MaterialModulo;