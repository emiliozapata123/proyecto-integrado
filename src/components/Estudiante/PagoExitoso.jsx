import { NavLink } from "react-router-dom";

const PagoExitoso = () => {
    return (
        <div className="container mt-4">
            <h3 className="text-success fw-bold">Pago realizado con éxito</h3>
            <p>Ya puedes acceder a tu curso desde tu panel.</p>
            <NavLink to="/estudiante" className="btn btn-primary mt-3">
                Ir a Mis Cursos
            </NavLink>
        </div>
    );
};

export default PagoExitoso;
