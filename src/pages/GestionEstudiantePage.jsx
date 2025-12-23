import { useEffect, useState } from "react";
import GestionarEstudiantes from "../components/gestion_estudiante/GestionarEstudiantes";
import api from "../api/api";
import DetalleEstudiante from "../components/gestion_estudiante/DetalleEstudiante";

const GestionEstudiantePage = () => {
    const [busqueda,setBusqueda] = useState("");
    const [busquedaCategoria,setBusquedaCategoria] = useState("");
    const [mostraModal,setMostrarModal] = useState(false);
    const [cursos, setCursos] = useState([]);
    const [estudiantes, setEstudiantes] = useState([]);
    console.log("cursos: ",cursos)
    console.log("esudiantes: ",estudiantes)

    useEffect(()=> {
        getCursos();
    }, []);

    const getCursos = async () => {
        try {
            const response = await api("/curso/list/");
            const data = await response.json();
            setCursos(data);
        } catch(e) {
            console.log(e);
        }

    }

    const cargarEstudiantes = async (id) => {
        try {
            const response = await api(`/registration/estudiante/curso/${id}/list/`);
            const data = await response.json();
            setEstudiantes(data);

        } catch(e) {
            console.log(e);
        }
    }

    const cursosFiltrados = cursos.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    const cursosCategoria = cursosFiltrados.filter(c => c.categoria.toLowerCase().includes(busquedaCategoria.toLowerCase()));

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h4 className="fw-bold">Gestión de Estudiantes</h4>
                <p className="text-muted">
                    Administra todos los estudiantes registrados
                </p>
            </div>
        </div>
        <section className="bg-light">
            <div className="card border-0 shadow-sm p-2">

                <div className="row mb-4">
                    <div className="col-md-8 mb-2">
                        <input 
                            type="text" 
                            className="form-control rounded-3" 
                            placeholder="Buscar cursos..." 
                            onChange={(e)=> setBusqueda(e.target.value)}
                        />
                    </div>

                    <div className="col-md-4 mb-2">
                        <select className="form-select rounded-3" onChange={(e)=> setBusquedaCategoria(e.target.value)}>
                            <option value="">Todas las Categorías</option>
                            <option value="Seguridad maritima">Seguridad maritima</option>
                            <option>Seguridad privada</option>
                            <option>Administración</option>
                        </select>
                    </div>
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-3 docente-list">
                    {cursos.length === 0 ? (
                        <h2 className="text-white text-center">No hay estudiantes</h2>
                    ):(
                        cursosCategoria?.map(c => (
                            <GestionarEstudiantes
                                setVerEstudiantes={()=> {setMostrarModal("detalles"); cargarEstudiantes(c.id)}} 
                                key={c.id} 
                                curso={c}
                            />
                        ))
                    )}
                </div>             
            </div>
        </section>
        {mostraModal === "detalles" && <DetalleEstudiante mostrarModal={setMostrarModal} estudiantes={estudiantes}/>}
        </>
    )
}
export default GestionEstudiantePage;