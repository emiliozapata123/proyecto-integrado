const CompletedCourses = ({curso}) => {
    return (
        <div key={curso.id} className="col-md-4">
            <div className="p-3 bg-success bg-opacity-10 border rounded-4 h-100 shadow-sm">
            <div className="d-flex justify-content-between align-items-start mb-2">
                <h6 className="fw-semibold text-dark">{curso.nombre}</h6>
            </div>
                <p className="text-muted small mb-0">{curso.fecha}</p>
            </div>
        </div>
    )
}
export default CompletedCourses;