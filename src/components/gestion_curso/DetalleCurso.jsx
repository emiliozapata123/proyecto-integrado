import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";
import { useParams } from "react-router-dom";
import useFetch from "../custom_hook/useFetch";

const DetalleCurso = () => {
    const { id } = useParams();
    const {data:curso} = useFetch(`/curso/${id}/detail/`);

    return (
        <>
        <NavBar/>
        <div key={curso.id} className="bg-cursos">
            <div className="row justify-content-center">
                <div className="row p-5">
                    <div className="card shadow-lg border-0 overflow-hidden">
                        <div className="row g-0">
                            <div className="col-md-6">
                                <img src={`http://127.0.0.1:8000/${curso.imagen}`} className="img-fluid h-100 w-100 object-fit-cover" alt="Curso de GG.SS."/>
                            </div>
                            <div className="col-md-6 bg-white">
                                <div className="card-body">
                                    <h2 className="card-title fw-bold">{curso.nombre}</h2>
                                    <p className="card-text text-muted small">{curso.descripcion}</p>

                                    <p className="mb-1"><i className="bi bi-clock me-2"></i>{curso.horas} horas</p>
                                    <p><i className="bi bi-people me-2"></i>{curso.cupo} cupos</p>

                                    <div className="d-flex gap-2 mt-3">
                                        <button className="btn btn-warning fw-semibold flex-fill">Solicitar Inscripción</button>
                                        <button className="btn btn-success fw-semibold flex-fill">
                                        <i className="bi bi-whatsapp me-1"></i>Consultar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}
export default DetalleCurso;