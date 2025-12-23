import { useState } from "react";
import useFetch from "../custom_hook/useFetch";
const CursosDestacados = ({mostrarModal, setVerRequisitos}) => {
    const [mostraModal, setMostrarModal] = useState(false);
    const {data:cursos} = useFetch("/curso/list/");


    return (
        <section className="py-5 bg-light">
            <div className="container text-center">
                <h3 className="fw-semibold mb-2">Nuestros Cursos</h3>
                <p className="text-muted mb-5">
                Descubre nuestra amplia oferta de cursos certificados diseñados para impulsar tu desarrollo profesional
                </p>

                {/* <div className="search-container mb-4">
                    <div className="search-bar">
                        <i className="bi bi-search search-icon"></i>
                        <input
                            type="text"
                            placeholder="Buscar cursos..."
                            className="form-control search-input"
                        />
                    </div>
                </div> */}

                {/* <div className="filter-buttons mb-5">
                    <button className="filter-btn active">Todos</button>
                    <button className="filter-btn">Tecnología</button>
                    <button className="filter-btn">Negocios</button>
                    <button className="filter-btn">Gastronomía</button>
                    <button className="filter-btn">Construcción</button>
                </div> */}

                <div className="row g-4 justify-content-center">
                {cursos.map((curso) => (
                    <div key={curso.id} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                            <img
                            src={`http://127.0.0.1:8000/${curso.imagen}`}
                            className="card-img-top"
                            alt={curso.nombre}
                            style={{ height: "220px", objectFit: "cover" }}
                            />

                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="badge bg-light text-dark border">
                                    {curso.categoria || "General"}
                                    </span>
                                    <span className="badge bg-light text-dark border">
                                    {curso.modalidad || "Presencial"}
                                    </span>
                                </div>

                                <h5 className="card-title fw-bold">{curso.nombre}</h5>

                                <p className="text-muted small mb-1">
                                    <i className="bi bi-clock me-2"></i>
                                    {curso.horas} horas
                                </p>
                                <p className="text-muted small mb-1">
                                    <i className="bi bi-calendar3 me-2"></i>
                                    Inicio: 15 Nov 2024
                                </p>
                                <p className="text-muted small mb-3">
                                    <i className="bi bi-people me-2"></i>
                                    {curso.cupo} estudiantes inscritos
                                </p>

                                <h5 className="fw-bold mb-0">
                                    ${Number(curso.precio).toLocaleString("es-CL")}
                                </h5>
                                <p className="text-muted small">*Financiamiento disponible</p>
                            </div>

                            <div className="card-footer bg-white border-0 text-center d-flex flex-column gap-2">
                                <button
                                    className="btn btn-dark w-100 fw-semibold"
                                    onClick={() => mostrarModal(curso.id)}
                                >
                                    Inscribirse Ahora
                                </button>

                                <button
                                    className="btn btn-outline-secondary w-100"
                                    onClick={() => setVerRequisitos(true)}
                                >
                                    Ver Requisitos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {cursos.length === 0 && (
                    <p className="text-center text-muted">No hay cursos disponibles.</p>
                )}
                </div>
            </div>
        </section>
    )

}
export default CursosDestacados;