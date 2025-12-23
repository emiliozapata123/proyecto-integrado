const InicioAdmin = () => {
    return (
        <div className="pb-4 bg-light">
            <h3 className="fw-bold mb-1">Panel de Administración</h3>
            <p className="text-muted mb-4">
                Resumen general de la plataforma OTEC
            </p>

            <div className="row g-3 mb-4">
                <div className="col-md-3">
                <div className="p-3 bg-white rounded-4 shadow-sm border">
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-muted">Total Estudiantes</h6>
                    <i className="bi bi-people fs-4 text-primary"></i>
                    </div>
                    <h3 className="fw-bold mt-2">1,245</h3>
                    <small className="text-success">+12% vs mes anterior</small>
                </div>
                </div>

                <div className="col-md-3">
                <div className="p-3 bg-white rounded-4 shadow-sm border">
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-muted">Cursos Activos</h6>
                    <i className="bi bi-journal-bookmark fs-4 text-success"></i>
                    </div>
                    <h3 className="fw-bold mt-2">48</h3>
                    <small className="text-muted">6 nuevos este mes</small>
                </div>
                </div>

                <div className="col-md-3">
                <div className="p-3 bg-white rounded-4 shadow-sm border">
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-muted">Docentes</h6>
                    <i className="bi bi-mortarboard fs-4 text-purple"></i>
                    </div>
                    <h3 className="fw-bold mt-2">85</h3>
                    <small className="text-muted">+5 este trimestre</small>
                </div>
                </div>

                <div className="col-md-3">
                <div className="p-3 bg-white rounded-4 shadow-sm border">
                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-muted">Próximos Cursos</h6>
                    <i className="bi bi-calendar-event fs-4 text-info"></i>
                    </div>
                    <h3 className="fw-bold mt-2">12</h3>
                    <small className="text-muted">Inician próxima semana</small>
                </div>
                </div>
            </div>

            <div className="row g-3">
                <div className="col-md-6">
                <div className="p-4 bg-white rounded-4 shadow-sm border">
                    <h6 className="fw-bold mb-3">Últimas Inscripciones</h6>
                    <div className="border-bottom pb-2 mb-2">
                    <strong>Juan Pérez</strong>
                    <div className="text-muted small">Programación Web</div>
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">2024-10-25</small>
                        <span className="badge bg-success">Aprobado</span>
                    </div>
                    </div>
                    <div>
                    <strong>Carla Gómez</strong>
                    <div className="text-muted small">Seguridad Privada</div>
                    <div className="d-flex justify-content-between">
                        <small className="text-muted">2024-11-02</small>
                        <span className="badge bg-warning text-dark">Pendiente</span>
                    </div>
                    </div>
                </div>
                </div>

                <div className="col-md-6">
                <div className="p-4 bg-white rounded-4 shadow-sm border">
                    <h6 className="fw-bold mb-3">Cursos Más Populares</h6>
                    <p className="fw-semibold mb-1">Programación Web Full Stack</p>
                    <div className="progress mb-3" style={{ height: "6px" }}>
                    <div className="progress-bar bg-dark" style={{ width: "90%" }}></div>
                    </div>

                    <p className="fw-semibold mb-1">Marketing Digital</p>
                    <div className="progress mb-3" style={{ height: "6px" }}>
                    <div className="progress-bar bg-dark" style={{ width: "80%" }}></div>
                    </div>

                    <p className="fw-semibold mb-1">Gestión de Proyectos</p>
                    <div className="progress" style={{ height: "6px" }}>
                    <div className="progress-bar bg-dark" style={{ width: "70%" }}></div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default InicioAdmin;
