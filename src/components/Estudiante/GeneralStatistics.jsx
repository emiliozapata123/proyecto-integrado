const GeneralStatistics = () => {
    return (
        <div className="row g-3">
            <div className="col-md-3">
                <div className="bg-white text-center p-4 border rounded-4 shadow-sm">
                    <h2 className="fw-bold mb-1">15</h2>
                    <p className="text-muted mb-0">Módulos Completados</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="bg-white text-center p-4 border rounded-4 shadow-sm">
                    <h2 className="fw-bold mb-1">5</h2>
                    <p className="text-muted mb-0">Certificados</p>
                </div>
            </div>
            <div className="col-md-3">
                <div className="bg-white text-center p-4 border rounded-4 shadow-sm">
                    <h2 className="fw-bold mb-1">12</h2>
                    <p className="text-muted mb-0">Días Racha</p>
                </div>
            </div>
        </div>
    )
}
export default GeneralStatistics;