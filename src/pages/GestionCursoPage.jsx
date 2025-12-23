import GestionarCursos from "../components/gestion_curso/GestionarCursos";
import CursoFormModal from "../components/gestion_curso/CursoForm";
import ModalEliminar from "../components/layout/ModalEliminar";
import api from "../api/api";
import { useEffect, useState } from "react";
import { NotifyError, NotifySuccess } from "../components/custom_hook/Notify";

const GestionCursoPage = () => {
    const [busqueda, setBusqueda] = useState("");
    const [mostrarModal, setMostrarModal] = useState(false);
    const [cursos,setCursos] = useState([]);
    const [curso, setCurso] = useState({});
    
    useEffect(()=> {
        getCursos();
        if (!mostrarModal){
            setCurso({});
        }
    }, [mostrarModal]);

    const cursosFiltrados = cursos.filter(c => c.nombre.includes(busqueda));

    const getCursos = async () => {
        try{
            const response = await api("/curso/list/");
            const data = await response.json();
            setCursos(data);
        }catch(e){
            console.error(e);
        }
    }

    const addCurso = async (newCourse) => {
        try{
            await api("/curso/form/","POST",newCourse);
            NotifySuccess("Curso Agregado correctamente.");
            getCursos();

        }catch(e){
            NotifyError("Nombre de curso ya existe.");
            console.error(e);

        }
    };

    const updateCurso = async (id,data) => {
        try{
            await api(`/curso/${id}/update/`,"PUT",data);
            getCursos();
            NotifySuccess("Curso Editado Correctamente.");
            setMostrarModal(false);


        }catch(e){
            console.error(e);
        }
    }

    const deleteCourse = async (id) => {
        try{
            await api(`/curso/${id}/delete/`,"DELETE");
            getCursos();
            NotifySuccess("Curso Eliminado.");
            setMostrarModal(false);

        }catch(e){
            console.error(e);
        }
        
    };

    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h4 className="fw-bold">Gestión de Cursos</h4>
                <p className="text-muted">
                    Administra todos los cursos de la plataforma
                </p>
            </div>
            <button className="btn btn-dark d-flex align-items-center gap-2" onClick={()=> setMostrarModal("crear")}>
                <i className="bi bi-plus fs-5"></i>Nuevo Curso
            </button>
        </div>

        <section className="bg-light">
            <div className="card border-0 shadow-sm p-3">
                <div className="mb-3 position-relative">
                    <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control ps-5 bg-light border-0"
                        placeholder="Buscar cursos..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-3 docente-list p-2">
                    {cursos.length === 0 ? (
                        <h2 className="text-white text-center">No hay cursos</h2>
                    ):(
                        cursosFiltrados?.map(c => (
                            <GestionarCursos 
                                mostrarModal={(id,vista)=> {setMostrarModal({id,vista});setCurso(c)}}
                                key={c.id} 
                                curso={c}
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
        {(mostrarModal === "crear" || mostrarModal.vista === "editar") && <CursoFormModal curso={curso} context={mostrarModal.vista} mostrarModal={setMostrarModal} addCurso={addCurso} updateCurso={updateCurso}/>}
        {mostrarModal.vista === "eliminar" && <ModalEliminar handleDelete={deleteCourse} curso={mostrarModal} mostrarModal={setMostrarModal} />}

        </>
    )

}

export default GestionCursoPage;

