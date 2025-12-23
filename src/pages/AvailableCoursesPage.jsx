import useFetch from "../components/custom_hook/useFetch";
import AvailableCourses from "../components/Estudiante/AvailableCourses";
import api from "../api/api";

const AvailableCoursesPage = () => {
    const {data:cursos} = useFetch("/curso/disponible/alumno/");

    const pagarCurso = async (cursoId) => {
        try {
            const response = await api("/pago/iniciar/","POST",{curso_id:cursoId});
            const data = await response.json();
            window.location.href = `${data.url}?token_ws=${data.token}`;

        } catch (e) {
            console.error(e);
        }
    }

    console.log(cursos)

    return (
        <div className="container py-4">
            <h2 className="fw-bold mb-1">Cursos Disponibles</h2>
            <p className="text-muted mb-4">Explora e inscríbete a nuevos cursos de capacitación</p>

            <div className="row mb-4">
                <div className="col-md-4 mb-2">
                    <input 
                        type="text" 
                        className="form-control rounded-3" 
                        placeholder="Buscar cursos..." 
                    />
                </div>

                <div className="col-md-4 mb-2">
                    <select className="form-select rounded-3">
                        <option>Todas las Categorías</option>
                        <option>Seguridad</option>
                        <option>Tecnología</option>
                        <option>Administración</option>
                    </select>
                </div>

                <div className="col-md-4">
                    <select className="form-select rounded-3">
                        <option>Todos los Niveles</option>
                        <option>Básico</option>
                        <option>Intermedio</option>
                        <option>Avanzado</option>
                    </select>
                </div>
            </div>

            <p className="text-muted">{cursos.length} cursos disponibles</p>

            <div className="row g-4">
                {cursos.map((c) => (
                    <AvailableCourses key={c.id} course={c} pagarCurso={pagarCurso}/>
                ))}
            </div>
        </div>
    )
}
export default AvailableCoursesPage;
