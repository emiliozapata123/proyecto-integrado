const MobileSidebar = ({ vistaActual, setVistaActual }) => {
    return (
        <div className="offcanvas offcanvas-start" id="mobileMenu">
            <div className="offcanvas-header">
                <h5>Menú</h5>
                <button className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
                <button className="btn w-100 mb-2" onClick={() => { setVistaActual("inicio");}} data-bs-dismiss="offcanvas">
                Dashboard
                </button>
                <button className="btn w-100 mb-2" onClick={() => { setVistaActual("gestionarCursos");}} data-bs-dismiss="offcanvas">
                Cursos
                </button>
                <button className="btn w-100 mb-2" onClick={() => { setVistaActual("estudiantes");}} data-bs-dismiss="offcanvas">
                Estudiantes
                </button>
                <button className="btn w-100 mb-2" onClick={() => { setVistaActual("docentes");}} data-bs-dismiss="offcanvas">
                Docentes
                </button>
            </div>
        </div>
    );
};
export default MobileSidebar;