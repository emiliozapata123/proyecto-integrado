import { use } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setVistaActual, vistaActual, sidebar, sidebarOpen, items }) => {
    const perfil = sessionStorage.getItem("perfil");
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user)
    const navigate = useNavigate();

    const logout = () => {
        sessionStorage.removeItem("access");
        sessionStorage.removeItem("refresh");
        sessionStorage.removeItem("perfil");
        navigate("/");
    }

    return (
        <div className={`sidebar ${sidebar ? "sidebar-open" : ""}`}>

            <div className="sidebar-header">
                <h4 className="logo">Prevy<span>Seg</span></h4>
                <p className="role">{perfil}</p>
                <h5>{user.nombre} {user.apellido}</h5>
            </div>
            <div className="linear"></div>
            <div className="sidebar-menu">
                {items.map(item => (
                    <button
                        key={item.id}
                        className={`sidebar-item ${vistaActual === item.id ? "active" : ""}`}
                        onClick={() => { setVistaActual(item.id); sidebarOpen(false); }}
                    >
                        <i className={`bi ${item.icon} me-3`}></i>
                        {item.label}
                    </button>
                ))}
            </div>

            <div className="sidebar-footer">
                <button className="sidebar-item" onClick={logout}>
                    <i className="bi bi-box-arrow-right me-3"></i>
                    Cerrar Sesión
                </button>
            </div>

        </div>
    );
};

export default Sidebar;

