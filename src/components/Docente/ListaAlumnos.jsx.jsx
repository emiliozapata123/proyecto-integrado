const ListaAlumnos = ({ curso,aprobarCurso }) => {
    const alumnos = curso.alumnos || [];
    console.log(alumnos)
    console.log(curso)


    return (
        <div className="mt-3">
            <h5 className="fw-semibold mb-3">Estudiantes inscritos</h5>

            {alumnos.length === 0 ? (
                <div className="text-center text-muted py-3 border rounded">
                    <i className="bi bi-people fs-3"></i>
                    <p className="mt-2">No hay estudiantes inscritos en este curso.</p>
                </div>
            ) : (
                <ul className="list-group">
                    {alumnos.map((a) => (
                        <li key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{a.nombre} {a.apellido}</strong>
                                <br />
                            </div>
                            <span className="badge bg-primary rounded-pill">{a.rut}</span>
                            {a.estado !== "Aprobado" ? (
                                <div className="d-flex gap-2">
                                    <button className="btn btn-success" onClick={()=> aprobarCurso(a.inscripcion_id)}>Aprobar</button>
                                    <button className="btn btn-danger">Reprobar</button>
                                </div>
                            ):a.estado === "Reprobado" ? (
                                <span className="badge bg-danger rounded-pill">{a.estado}</span>
                            ):(
                                <span className="badge bg-success rounded-pill">{a.estado}</span>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListaAlumnos;
