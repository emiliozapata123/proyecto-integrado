import { useEffect, useState } from "react";
import ListaInscripciones from "../components/gestion_estudiante/ListaInscripciones";
import api from "../api/api";
import DetallePreInscripcion from "../components/gestion_estudiante/DetallePreInscripcion";
import useFetch from "../components/custom_hook/useFetch";

const InscripcionPage = () => {
    const [preInscripciones,setPreInscripciones] = useState([]);
    const [mostrarModal,setMostrarModal] = useState(false);
    const [busqueda,setBusqueda] = useState("");
    const [busquedaEstado, setBusquedaEstado] = useState("");
    const [busquedaCurso, setBusquedaCurso] = useState("");
    const [orden,setOrden] = useState("");
    const {data:cursos} = useFetch("/curso/list/");

    console.log(preInscripciones)

    useEffect(()=> {
        getInscripciones();
    },[]);

    const buscarInscripciones = preInscripciones.filter(i => `${i.nombre} ${i.apellido} ${i.curso?.nombre}`.toLowerCase().includes(busqueda.toLowerCase()));
    const filtrarPorEstado = buscarInscripciones.filter(i => i.estado.includes(busquedaEstado));
    const filtrarPorCurso = filtrarPorEstado.filter(i => String(i.curso?.id).includes(busquedaCurso));
    const inscripcionesOrdenadas = [...filtrarPorCurso].sort((a, b) => {
        const fechaA = new Date(a.fechaPostulacion);
        const fechaB = new Date(b.fechaPostulacion);

        if (orden === "fecha_desc") return fechaB - fechaA; 
        if (orden === "fecha_asc") return fechaA - fechaB; 

        const nombreA = `${a.nombre} ${a.apellido}`.toLowerCase();
        const nombreB = `${b.nombre} ${b.apellido}`.toLowerCase();
        if (orden === "alumno_asc") return nombreA.localeCompare(nombreB);

        return 0;
    });

    const getInscripciones = async () => {
        try{
            const response = await api("/preinscripcion/list");
            const data = await response.json();
            setPreInscripciones(data);

        }catch(e){
            console.error(e);
        }
    }

    const addInscripcion = async (id,estado) => {
        try{
            const response = await api(`/preinscripcion/${id}/aprobar`,"POST",estado);
            const data = await response.json();
            console.log(data);
            setMostrarModal(false);
            getInscripciones();

        }catch(e){
            console.error(e);
        }
    }

    return (
        <section className="bg-light">
            <div className="card border-0 shadow-sm p-3">
                <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-3">
                    <div>
                        <h5 className="fw-bold mb-1">Listado de Inscripciones</h5>
                        <p className="text-muted mb-0">Revisa y gestiona las inscripciones de alumnos</p>
                    </div>
                    <div className="d-flex align-items-center bg-light rounded position-relative w-50 h-25">
                        <i className="bi bi-search ms-3 text-muted"></i>
                        <input
                            type="text"
                            className="form-control border-0 bg-light ps-3"
                            value={busqueda}
                            placeholder="Buscar por alumno o curso..."
                            onChange={(e)=> setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row g-2 mb-3">
                <div className="col-12 col-md-4">
                    <select className="form-select" onChange={(e)=> setBusquedaEstado(e.target.value)}>
                        <option value="">Todos los estados</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Rechazado">Rechazado</option>
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <select className="form-select" onChange={(e)=> setBusquedaCurso(e.target.value)}>
                        <option value="">Filtrar por curso</option>
                        {cursos?.map(c => (
                            <option key={c.id} value={c.id}>{c.nombre}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12 col-md-4">
                    <select className="form-select" onChange={(e)=> setOrden(e.target.value)}>
                    <option value="">Ordenar por</option>
                        <option value="fecha_desc">Fecha (más reciente)</option>
                        <option value="fecha_asc">Fecha (más antiguo)</option>
                        <option value="alumno_asc">Alumno (A-Z)</option>
                    </select>
                </div>
                </div>

                <div className="table-responsive">
                    <table className="table align-middle">
                        <thead className="table-light">
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Rut</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Direccion</th>
                            <th>Curso interes</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                            <th className="text-end">Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                            {preInscripciones.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center text-muted py-4">
                                        No hay inscripciones
                                    </td>
                                </tr>
                            ):(inscripcionesOrdenadas?.map(i => (
                                <ListaInscripciones key={i.id} inscripcion={i} addInscripcion={addInscripcion} mostrarModal={setMostrarModal}/>
                            )))}
                        </tbody>
                    </table>
                </div>
            </div>
            {mostrarModal && <DetallePreInscripcion inscripcion={mostrarModal} mostrarModal={setMostrarModal} addInscripcion={addInscripcion}/>}
        </section>
    )
}
export default InscripcionPage;
