const MisCursoCard = ({ curso, courseSelected, onSelect }) => {
    return (
        <div 
            className={`card p-3 mb-3 shadow-sm ${courseSelected ? "border-primary" : ""}`}
            style={{ cursor:"pointer" }}
            onClick={()=> onSelect(curso)}
        >
            <h5 className="fw-semibold">{curso.nombre}</h5>
            <small className="text-muted">Progreso</small>
            
            <div className="progress my-2" style={{ height:"6px" }}>
                <div className="progress-bar bg-primary" style={{ width:"60%" }}></div>
            </div>

            <div className="d-flex justify-content-between text-muted">
                <span><i className="bi bi-people"></i> {curso.alumnos.length} Alumnos</span>
                <span><i className="bi bi-journal-text"></i> {curso.modulos} módulos</span>
            </div>
        </div>
    );
};
export default MisCursoCard;
