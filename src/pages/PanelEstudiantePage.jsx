import CompletedCourses from "../components/Estudiante/CompletedCourses";
import GeneralStatistics from "../components/Estudiante/GeneralStatistics";
import StudentStatsCards from "../components/Estudiante/StudentStatsCards";

const PanelEstudiantePage = () => {
    const cursosCompletados = [
        { id: 1, nombre: "Prevención de Riesgos Laborales", fecha: "15/05/2024", nota: 95 },
        { id: 2, nombre: "Atención al Cliente", fecha: "10/04/2024", nota: 88 },
        { id: 3, nombre: "Primeros Auxilios", fecha: "22/03/2024", nota: 92 },
    ];

    return (
        <div className="pb-4 bg-light">
            <h3 className="fw-bold mb-1">Mi Panel de Estudiante</h3>
            <p className="text-muted mb-4">
                Bienvenido de vuelta, continua tu aprendizaje
            </p>
            <StudentStatsCards/>
            <div className="p-4 bg-white rounded-4 border mt-4 mb-4">
                <h5 className="fw-bold">Cursos Completados</h5>
                <p className="text-muted mb-3">Tus certificaciones obtenidas</p>
                <div className="row g-3">
                    {cursosCompletados.map((curso) => (
                        <CompletedCourses key={curso.id} curso={curso}/>
                    ))}
                </div>
            </div>
            <GeneralStatistics/>
        </div>
    )
};
export default PanelEstudiantePage;