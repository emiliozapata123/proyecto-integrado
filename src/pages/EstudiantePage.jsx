import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import NavBarUser from "../components/layout/NavBarUser";
import PanelEstudiantePage from "./PanelEstudiantePage";
import CursoEstudiantePage from "./CursoEstudiantePage";
import AvailableCoursesPage from "./AvailableCoursesPage";
import CertificadosPage from "./CertificadosPage";

const EstudiantePage = () => {
    const [vistaActual, setVistaActual] = useState("inicio");
    const [sidebarOpen,setSidebarOpen] = useState(false);

    const vistas = {
        inicio: <PanelEstudiantePage />,
        cursosDisponibles: <AvailableCoursesPage/>,
        misCursos: <CursoEstudiantePage/>,
        certificados: <CertificadosPage/>,

    }

    const items = [
        { id: "inicio", icon: "bi-grid-fill", label: "Dashboard" },
        { id: "cursosDisponibles", icon: "bi-book", label: "Cursos Disponibles"},
        { id: "misCursos", icon: "bi-book", label: "Mis Cursos" },
        { id: "certificados" ,icon: "bi bi-patch-check", label: "Certificados"}
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
export default EstudiantePage;