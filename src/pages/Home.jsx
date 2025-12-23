import NavBar from "../components/layout/NavBar";
import Inicio from "../components/layout/Inicio";
import SobreNosotros from "../components/layout/SobreNosotros";
import CursosDestacados from "../components/layout/CursosDestacados";
import Contacto from "../components/layout/Contactanos";
import Footer from "../components/layout/Footer";
import { useRef, useState } from "react";
import PreInscripcion from "../components/gestion_estudiante/PreInscripcion";
import RequisitoInscripcion from "../components/layout/RequisitoInscripcion";

const Home = () => {
    const [mostrarModal,setMostrarModal] = useState(false);
    const [verRequisitos, setVerRequisitos] = useState(false);
    const inicio = useRef(null);
    const cursos = useRef(null);
    const sobreNosotros = useRef(null);
    const contacto = useRef(null);

    const scroll = (ref) => {
        ref.current?.scrollIntoView({behavior:"smooth"})
    };

    return (
        <>
            <NavBar
                onInicio={()=> scroll(inicio)}
                onCursos={()=> scroll(cursos)}
                onSobreNosotros={()=> scroll(sobreNosotros)}
                onContacto={()=> scroll(contacto)}
            />

            <div ref={inicio}>
                <Inicio/>
            </div>
            <div ref={cursos}>
                <CursosDestacados mostrarModal={setMostrarModal} setVerRequisitos={setVerRequisitos}/>
            </div>
            <div ref={sobreNosotros}>
                <SobreNosotros/>
            </div>
            <div ref={contacto}>
                <Contacto/>
            </div>
            <Footer/>
            {mostrarModal && <PreInscripcion cursoId={mostrarModal} mostrarModal={setMostrarModal}/>}
            {verRequisitos && <RequisitoInscripcion setVerRequisitos={setVerRequisitos}/>}
        </>
    )
}
export default Home;
                // <Route path="detalle-curso/:id" element={<DetalleCurso/>}/>


{/* <div className="bg-buscador">
        <Buscador/>
        </div>
        <div className="bg-cursos p-4">
            {cursos.length === 0 ? (
                <h2 className="text-white text-center">No hay cursos</h2>
            ):(
                <div className="row g-4">
                    {cursos?.map(c => (
                        <div key={c.id} className="col-md-4">
                            <div className="card shadow h-100">
                                <img src={`http://127.0.0.1:8000/${c.imagen}`}  className="card-img-top" alt="Curso 1"/>
                                <div className="card-body text-dark">
                                    <h5 className="card-title">{c.nombre}</h5>
                                    <p className="card-text small text-muted">{c.descripcion}</p>
                                    <p className="mb-1"><i className="bi bi-clock"></i> {c.horas} horas</p>
                                    <p><i className="bi bi-people"></i> {c.cupo} cupos</p>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span className="fw-bold">${Number(c.precio).toLocaleString("es-CL")}</span>
                                        <NavLink to={`detalle-curso/${c.id}`}>
                                            <button className="btn btn-warning">Ver detalles</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer/> */}