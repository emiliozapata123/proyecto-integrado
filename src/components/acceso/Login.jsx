import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api/api";
import { NotifySuccess, NotifyError } from "../custom_hook/Notify";

const Login = () => {
    const [identificador, setIdentificador] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identificador || !password){
            NotifyError("Ingrese sus datos.");
            return;
        }

        const data = {
            username:identificador,
            password:password
        }

        try {
            const response = await api("/registration/login/","POST",data);
            const result = await response.json();
            sessionStorage.setItem("access", result.access);
            sessionStorage.setItem("refresh", result.refresh);
            sessionStorage.setItem("perfil",result.user.rol.nombre);
            sessionStorage.setItem("user",JSON.stringify({nombre:result.user.nombre,apellido:result.user.apellido}));
            console.log(result.user)

            if (result.user.rol.nombre === "Docente") {
                NotifySuccess("Sesion iniciada correctamente.");
                navigate("/teacher");
            } else if (result.user.rol.nombre === "Administrador") {
                NotifySuccess("Sesion iniciada correctamente.");
                navigate("/admin");
            } else {
                NotifySuccess("Sesion iniciada correctamente.");
                navigate("/estudiante");
            }
            
        } catch (e) {
            console.log(e);
            NotifyError("Datos incorrectos");
        }
    }

    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center mt-5 pt-2">
            <div className="login-card text-center p-4 shadow border rounded-4 p-3 mb-3 bg-white shadow-sm-sm">
                <div className="mb-4">
                    <i className="bi bi-mortarboard fs-1"></i>
                    <h1 className="mt-2 fw-semibold">OTEC ProCapacita</h1>
                    <p className="text-muted mb-0">Portal de Acceso</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <h5 className="text-start fw-semibold">Iniciar Sesión</h5>
                    <p className="text-start text-muted mb-3">
                        Accede a tu panel de administración o docente
                    </p>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Identificador</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="tu@email.com"
                            onChange={(e)=> setIdentificador(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-start">
                        <label className="form-label fw-semibold">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="********"
                            onChange={(e)=> setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="btn btn-dark w-100 mb-3">
                        Ingresar
                    </button>

                    <NavLink to="/" type="button" className="btn btn-outline-dark w-100">
                        <i className="bi bi-arrow-left me-2"></i> Volver al Sitio Público
                    </NavLink>
                </form>
            </div>
        </div>
    )
}
export default Login;