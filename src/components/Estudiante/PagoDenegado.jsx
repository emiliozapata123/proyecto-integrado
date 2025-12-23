import { NavLink } from "react-router-dom";

const PagoDenegado = () => {
    return (
        <div className="container mt-4">
            <h3 className="text-success fw-bold">Curso ya ha sido pagado</h3>
            <p>Ya puedes acceder a tu curso desde tu panel.</p>
            <NavLink to="/estudiante" className="btn btn-primary mt-3">
                Ir a Mis Cursos
            </NavLink>
        </div>
    );
};

export default PagoDenegado;
