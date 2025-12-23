import { useEffect, useState } from "react";
import api from "../api/api";
import MisCursoCard from "../components/Docente/MisCursoCard";
import PanelCurso from "../components/Docente/PanelCurso";

const CursoDocentePage = () => {
    const [cursos, setCursos] = useState([]);
    const [courseSelected, setCourseSelected] = useState(null);

    useEffect(() => {
        getCursosDocente();
    }, []);

    const getCursosDocente = async () => {
        const response = await api("/curso/docente/list/");
        const data = await response.json();
        setCursos(data);
    };

    const aprobarCurso = async (id) => {
        try {
            await api(`/curso/${id}/aprobar/`,"PATCH");
            getCursosDocente();

        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="row g-3">
            <h4 className="fw-bold">Mis Cursos</h4>
            <p className="text-muted">Gestiona tus cursos y contenidos</p>
            <div className="col-12 col-md-4">
                {cursos.length === 0 ? (
                    <p className="text-center text-muted">No tienes cursos asignados.</p>
                ) : (
                    cursos.map((c) => (
                        <MisCursoCard
                            key={c.id}
                            curso={c}
                            onSelect={setCourseSelected}
                            courseSelected={courseSelected?.id === c.id}
                        />
                    ))
                )}
            </div>

            <div className="col-8">
                {!courseSelected ? (
                    <div className="text-center text-muted p-5 border rounded-3">
                        <i className="bi bi-book fs-1"></i>
                        <p className="mt-3 fw-semibold">Selecciona un curso</p>
                        <p>Elige un curso de la lista para ver sus detalles.</p>
                    </div>
                ) : (
                    <PanelCurso key={courseSelected.id} curso={courseSelected} aprobarCurso={aprobarCurso} />
                )}
            </div>
        </div>
    );
};
export default CursoDocentePage;
