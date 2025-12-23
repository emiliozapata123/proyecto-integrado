import { useState } from "react";
import InicioDocente from "../components/Docente/InicioDocente";
import Sidebar from "../components/layout/Sidebar";
import NavBarUser from "../components/layout/NavBarUser";
import CursoDocentePage from "./CursoDocentePage";
import GestionarCursos from "../components/gestion_curso/GestionarCursos";
import HorarioPage from "./HorarioPage";

const TeacherPage = () => {
    const [vistaActual, setVistaActual] = useState("inicio");
    const [sidebarOpen,setSidebarOpen] = useState(false);


    const vistas = {
        inicio: <InicioDocente />,
        misCursos: <CursoDocentePage/>,
        horario: <HorarioPage/>,

    }

    const items = [
        { id: "inicio", icon: "bi-grid-fill", label: "Dashboard" },
        { id: "misCursos", icon: "bi-book", label: "Mis Cursos" },
        { id: "horario", icon: "bi bi-calendar", label: "Horario" },

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
                <main className="flex-grow-1 bg-light p-4">
                    {vistas[vistaActual]}
                </main>
            </div>
        </>
    )
}
export default TeacherPage;