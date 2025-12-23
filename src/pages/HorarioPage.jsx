import { useState, useEffect } from "react";
import useFetch from "../components/custom_hook/useFetch";
import VerHorario from "../components/Horario/VerHorario";
import api from "../api/api";
import MyCourses from "../components/Estudiante/MyCourses";

const HorarioPage = () => {
    const [horario, setHorario] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [verHorario, setVerHorario] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [busquedaCategoria, setBusquedaCategoria] = useState("");
    const [curso, setCurso] = useState({});
    const {data:cursos} = useFetch("/curso/list/");

    console.log("cursos : ",cursos)
    const cursosFiltrados = cursos.filter(c => c.nombre.toLowerCase().includes(busqueda.toLowerCase()));
    const cursosCategoria = cursosFiltrados.filter(c => c.categoria.toLowerCase().includes(busquedaCategoria.toLowerCase()));

    useEffect(() => {
        cargarHorario();
    }, [curso]);

    const cargarHorario = async () => {
        try {

            const response = await api(`/curso/${curso.id}/horario/list/`);
            const data = await response.json();
            setHorario(data);

        } catch (e) {
            console.error(e);
        }
    };

    const addHorario = async (data) => {
        const form = {
            ...data,
            curso:curso.id
        }
        try {
            await api("/curso/horario/form/","POST",form);
            setMensaje("Horario Agregado.");
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            cargarHorario();

        } catch (e) {
            console.error(e);
        }
    };

    const removeHorario = async (id) => {
        try {
            await api(`/curso/${curso.id}/horario/${id}/delete/`,"DELETE");
            setMensaje("Horario Eliminado.");
            setTimeout(() => {
                setMensaje("");
            }, 3000);
            cargarHorario();

        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h4 className="fw-bold">Gestión de Horario</h4>
                <p className="text-muted">
                    Administra los horarios
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
                <div className="row row-cols-1 row-cols-md-2 g-3 docente-list p-2">
                    {curso.length === 0 ? (
                        <h2 className="text-white text-center">No hay cursos</h2>
                    ):(
                        cursosCategoria?.map(c => (
                            <MyCourses 
                                verHorario={()=> {setVerHorario(true); setCurso(c)}}
                                key={c.id} 
                                curso={c}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
        {verHorario && 
            <VerHorario 
                curso={curso} 
                addHorario={addHorario} 
                cerrar={()=> setVerHorario(false)} 
                horario={horario}
                mensaje={mensaje}
                removeHorario={removeHorario}
            />
        }
        </>
    )

}
export default HorarioPage;