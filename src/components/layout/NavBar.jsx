import { NavLink } from "react-router-dom";

const NavBar = ({onInicio,onCursos,onSobreNosotros,onContacto}) => {
    return (
        <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top">
            <div className="container">
                <img src="/img/img-otec.jpg" alt="logo-otec" width="60"/>
                <span className="m-2">OTEC</span>
                <span className="text-primary">ProCapacita</span>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav align-items-center gap-3">
                        <li className="nav-item">
                            <button className="nav-link fw-semibold" onClick={onInicio}>Inicio</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link fw-semibold" onClick={onCursos}>Cursos</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link fw-semibold" onClick={onSobreNosotros}>Nosotros</button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link fw-semibold" onClick={onContacto}>Contacto</button>
                        </li>
                    </ul>

                    <div className="ms-4 d-flex align-items-center gap-2">
                        <NavLink to="/login" className="btn btn-outline-primary fw-semibold">
                        Acceso
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
        
    )
}
export default NavBar;