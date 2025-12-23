import { useState } from "react";
import InicioAdmin from "../components/gestion_curso/InicioAdmin";
import NavBarUser from "../components/layout/NavBarUser";
import Sidebar from "../components/layout/Sidebar";
import InscripcionPage from "./InscripcionPage";
import GestionCursoPage from "./GestionCursoPage";
import GestionDocentePage from "./GestionDocentePage";
import GestionEstudiantePage from "./GestionEstudiantePage";
import HorarioPage from "./HorarioPage";

const AdminPage = () => {
    const [vistaActual, setVistaActual] = useState("inicio");
    const [sidebarOpen,setSidebarOpen] = useState(false);

    const vistas = {
        inicio: <InicioAdmin />,
        gestionarCursos: <GestionCursoPage/>,
        docentes:<GestionDocentePage/>,
        estudiantes:<GestionEstudiantePage vistaActual={setVistaActual}/>,
        inscripciones:<InscripcionPage/>,
        horario:<HorarioPage/>,
    };

    const items = [
        { id: "inicio", icon: "bi-grid-fill", label: "Dashboard" },
        { id: "gestionarCursos", icon: "bi-book", label: "Cursos" },
        { id: "estudiantes", icon: "bi-people", label: "Estudiantes" },
        { id: "docentes", icon: "bi-person-badge", label: "Docentes" },
        { id: "inscripciones", icon: "bi-person-badge", label: "Inscripciones" },
        { id: "horario", icon:"bi bi-calendar-event", label: "Horario" },


    ];

    return (
        <>
        <div className="d-md-none">
            <NavBarUser sidebarOpen={setSidebarOpen}/>
        </div>
        <Sidebar 
            setVistaActual={setVistaActual} 
            vistaActual={vistaActual} 
            sidebar={sidebarOpen}
            sidebarOpen={setSidebarOpen}
            items={items}

        />
        <div className="admin-layout">
            <main className="flex-grow-1 bg-light p-3">
                {vistas[vistaActual]}
            </main>
        </div>
           
        </>
    );
};

export default AdminPage;
