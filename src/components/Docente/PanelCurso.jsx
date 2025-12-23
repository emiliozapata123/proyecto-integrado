import { useState } from "react";
import ListaAlumnos from "./ListaAlumnos.jsx";
import ModuloPage from "../../pages/ModuloPage.jsx";
import MaterialPage from "../../pages/MaterialPage.jsx";

const PanelCurso = ({ curso, aprobarCurso }) => {
    console.log("inscripcion: ",curso)
    const [tab, setTab] = useState("modulos");

    return (
        <div className="card p-4 shadow-sm">
            <h5 className="fw-bold">{curso.nombre}</h5>
            <p className="text-muted">Gestión del curso</p>

            <div className="d-flex justify-content-around bg-light rounded-pill p-1 mb-4">
                <button
                    className={`btn rounded-pill flex-fill w-100 ${
                    tab === "modulos" ? "btn-primary p-1 text-white" : "btn-light"
                    }`}
                    onClick={() => setTab("modulos")}
                >
                    Modulos
                </button>
                <button
                    className={`btn rounded-pill flex-fill w-100 ${
                    tab === "estudiantes" ? "btn-primary p-1 text-white" : "btn-light"
                    }`}
                    onClick={() => setTab("estudiantes")}
                >
                    Estudiantes
                </button>
                <button
                    className={`btn rounded-pill flex-fill w-100 ${
                    tab === "materiales" ? "btn-primary p-1 text-white" : "btn-light"
                    }`}
                    onClick={() => setTab("materiales")}
                >
                    Materiales
                </button>
            </div>

            {tab === "modulos" && <ModuloPage curso={curso}/>}
            {tab === "estudiantes" && <ListaAlumnos curso={curso} aprobarCurso={aprobarCurso}/>}
            {tab === "materiales" && <MaterialPage curso={curso}/>}
        </div>
    );
};
export default PanelCurso;
