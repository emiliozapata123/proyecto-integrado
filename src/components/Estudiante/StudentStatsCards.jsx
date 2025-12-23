const StudentStatsCards = () => {
    return (
        <div className="row g-4 mt-3">
            <div className="col-md-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="p-4 text-white" style={{ background: "linear-gradient(135deg, #0061ff, #3a86ff)" }}>
                        <i className="bi bi-book fs-2"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="fw-bold mb-0">3</h3>
                        <p className="text-muted mb-0">Cursos Activos</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="p-4 text-white" style={{ background: "linear-gradient(135deg, #00c853, #00e676)" }}>
                        <i className="bi bi-award fs-2"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="fw-bold mb-0">5</h3>
                        <p className="text-muted mb-0">Cursos Completados</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="p-4 text-white" style={{ background: "linear-gradient(135deg, #9b4dff, #c77dff)" }}>
                        <i className="bi bi-clock-history fs-2"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="fw-bold mb-0">124</h3>
                        <p className="text-muted mb-0">Horas de Estudio</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="p-4 text-white" style={{ background: "linear-gradient(135deg, #00a8cc, #00c2fd)" }}>
                        <i className="bi bi-graph-up-arrow fs-2"></i>
                    </div>
                    <div className="card-body">
                        <h3 className="fw-bold mb-0">68%</h3>
                        <p className="text-muted mb-0">Progreso General</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default StudentStatsCards;