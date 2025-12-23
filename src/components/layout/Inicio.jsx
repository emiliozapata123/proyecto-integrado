const Inicio = () => {
  return (
    <section className="bg-light py-5">
        <div className="container d-flex flex-wrap align-items-center justify-content-between">
            <div className="col-md-6 mb-4 mb-md-0">
            <span className="badge bg-light text-dark border mb-3">
                🎓 OTEC Certificado SENCE
            </span>
            <h1 className="fw-bold display-5 mb-4">
                Capacitación Profesional que Impulsa tu Carrera
            </h1>
            <p className="text-muted mb-4">
                Desarrolla nuevas habilidades con nuestros cursos certificados.
                Más de 5,000 estudiantes han confiado en nosotros para transformar sus carreras profesionales.
            </p>
            <div className="d-flex gap-3">
                <button className="btn btn-dark btn-lg">Ver Cursos</button>
                <button className="btn btn-outline-dark btn-lg">Contactar</button>
            </div>

            <div className="d-flex gap-5 mt-5">
                <div>
                <h3 className="fw-bold">150+</h3>
                <p className="text-muted small mb-0">Cursos</p>
                </div>
                <div>
                <h3 className="fw-bold">5,000+</h3>
                <p className="text-muted small mb-0">Estudiantes</p>
                </div>
                <div>
                <h3 className="fw-bold">95%</h3>
                <p className="text-muted small mb-0">Satisfacción</p>
                </div>
            </div>
            </div>

            <div className="col-md-5">
            <img
                src="/img/img-inicio.png"
                className="img-fluid rounded shadow"
                alt="Capacitación profesional"
            />
            </div>
        </div>
    </section>
  );
};

export default Inicio;
