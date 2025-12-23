import * as XLSX from "xlsx";

const DetalleEstudiante = ({ mostrarModal, estudiantes }) => {
    const exportarExcel = () => {
        const data = estudiantes.map((e, index) => ({
            "#": index + 1,
            Nombre: e.nombre,
            ApellidoPaterno:e.apellidoPaterno,
            ApellidoMaterno:e.apellidoMaterno,
            FechaNacimiento:e.fechaNacimiento,
            Rut:e.rut,
            Email: e.correo,
            Telefono:e.telefono,
            Direccion:e.direccion,
            Curso:e.curso,
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Estudiantes");

        XLSX.writeFile(workbook, "estudiantes.xlsx");
    };

    return (
        <div className="modal fade show d-block bg-dark bg-opacity-50">
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content border-0 rounded-4 shadow-lg">

                    <div className="modal-header border-0 px-4 py-3">
                        <h5 className="modal-title fw-semibold text-dark">
                            <i className="bi bi-people me-2 text-secondary"></i>
                            Estudiantes inscritos
                        </h5>
                        <button
                            className="btn-close"
                            onClick={() => mostrarModal(false)}
                        />
                    </div>

                    <div className="modal-body px-4">

                        {estudiantes.length === 0 ? (
                            <p className="text-center text-muted py-4">
                                No hay estudiantes inscritos en este curso
                            </p>
                        ) : (
                            <div className="table-container">
                                <table className="table table-hover align-middle mb-0">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Apellido Paterno</th>
                                            <th>Apellido Materno</th>
                                            <th>Rut</th>
                                            <th>Email</th>
                                            <th>Fecha Nacimiento</th>
                                            <th>Teléfono</th>
                                            <th>Direccion</th>
                                            <th>Curso</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {estudiantes.map((e, i) => (
                                            <tr key={e.id}>
                                                <td>{i + 1}</td>
                                                <td className="fw-medium">{e.nombre}</td>
                                                <td>{e.apellidoPaterno}</td>
                                                <td>{e.apellidoMaterno}</td>
                                                <td>{e.rut}</td>
                                                <td>{e.correo}</td>
                                                <td>{e.fechaNacimiento}</td>
                                                <td>{e.telefono}</td>
                                                <td>{e.direccion}</td>
                                                <td>{e.curso}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>

                    <div className="modal-footer border-0 px-4 pb-4">
                         <button
                            className="btn btn-outline-success"
                            onClick={exportarExcel}
                            disabled={estudiantes.length === 0}
                        >
                            <i className="bi bi-file-earmark-excel me-2"></i>
                            Descargar Excel
                        </button>
                        <button
                            className="btn btn-outline-secondary px-4"
                            onClick={() => mostrarModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetalleEstudiante;
