import { useEffect, useState } from "react";
import api from "../api/api";
import GestionarDocentes from "../components/gestion_docente/GestionarDocentes";
import DocenteForm from "../components/gestion_docente/DocenteForm";
import DetalleDocente from "../components/gestion_docente/DetalleDocente";
import AsignarCursosDocente from "../components/gestion_docente/AsignarCursosDocente";

const GestionDocentePage = () => {
    const [mostrarModal,setMostrarModal] = useState(false);
    const [busqueda,setBusqueda] = useState("");
    const [docentes,setDocentes] = useState([]);
    const [docente,setDocente] = useState({});
    const [loading,setLoading] = useState(false);

    console.log(docente)

    useEffect(()=> {
        getDocentes();
    }, []);

    const docentesFiltrados = docentes.filter(d => d.nombre.includes(busqueda));
    
    const getDocentes = async () => {
        try{
            const response = await api("/registration/docente/list/");
            const data = await response.json();
            setDocentes(data);

        }catch(e){
            console.error(e);
        }
    };

    const getDocenteDetail = async (id) => {
        setLoading(true);
        try {
            const response = await api(`/registration/docente/${id}/detail`);
            const data = await response.json();
            setDocente(data);

        } catch(e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    const addDocente = async (newDocente) => {
        try {
            await api("/registration/docente/form/","POST",newDocente);
            getDocentes();

        } catch(e) {
            console.error(e);
        }
    };

    const addCursoDocente = async (id,cursos) => {
        try {
            await api(`/curso/docente/${id}/asignar`,"PATCH",cursos);
            getDocentes();
            getDocenteDetail(id);
            setMostrarModal(false);

        } catch(e) {
            console.error(e);
        }
    }


    return (
        <>
        <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
                <h4 className="fw-bold">Gestión de Docentes</h4>
                <p className="text-muted">
                    Administra el equipo de docentes
                </p>
            </div>
            <button className="btn btn-dark d-flex align-items-center gap-2" onClick={()=> setMostrarModal("crear")}>
                <i className="bi bi-plus fs-5"></i>Agregar Docente
            </button>
        </div>

        <section className="bg-light">
            <div className="card border-0 shadow-sm p-2">
                <div className="mb-3 position-relative">
                    <span className="position-absolute top-50 translate-middle-y ms-3 text-muted">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control ps-5 bg-light border-0"
                        placeholder="Buscar Docente..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
                <div className="row row-cols-1 row-cols-md-2 g-3 docente-list p-2">
                    {docentes.length === 0 ? (
                        <h2 className="text-white text-center">No hay docentes</h2>
                    ):(
                        docentesFiltrados?.map(c => (
                            <GestionarDocentes
                                mostrarModal={(id,vista)=> {setMostrarModal(vista); getDocenteDetail(id)}} 
                                key={c.id} 
                                docente={c} 
                            />
                        ))
                    )}
                </div>
            </div>
        </section>
        {mostrarModal === "crear" && 
            <DocenteForm 
                mostrarModal={setMostrarModal} 
                addDocente={addDocente}
            />
        }
        {mostrarModal === "detalle" && 
            <DetalleDocente 
                docente={docente} 
                mostrarModal={setMostrarModal} 
                loading={loading}
            /> 
        }
        {mostrarModal === "asignar-curso" && 
            <AsignarCursosDocente 
                mostrarModal={setMostrarModal}
                docente={docente}
                addCursoDocente={addCursoDocente}
            />
        }

        </>
    )
}
export default GestionDocentePage;