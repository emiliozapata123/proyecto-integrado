const SobreNosotros = () => {
    return (
        <section className="sobre-nosotros py-5">
            <div className="container text-center">

                <h4 className="fw-semibold mb-2">Sobre Nosotros</h4>
                <p className="text-muted mb-5">
                Más de 15 años transformando vidas a través de la educación y capacitación profesional
                </p>

                <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card border-light shadow-sm h-100 p-4">
                    <div className="icono mx-auto mb-3">
                        <i className="bi bi-bullseye"></i>
                    </div>
                    <h5 className="fw-semibold mb-2">Misión</h5>
                    <p className="text-muted small">
                        Proporcionar capacitación de excelencia que impulse el desarrollo profesional y laboral de nuestros estudiantes.
                    </p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-light shadow-sm h-100 p-4">
                    <div className="icono mx-auto mb-3">
                        <i className="bi bi-eye"></i>
                    </div>
                    <h5 className="fw-semibold mb-2">Visión</h5>
                    <p className="text-muted small">
                        Ser el OTEC líder en Chile, reconocido por la calidad de nuestros programas y el éxito de nuestros egresados.
                    </p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-light shadow-sm h-100 p-4">
                    <div className="icono mx-auto mb-3">
                        <i className="bi bi-heart"></i>
                    </div>
                    <h5 className="fw-semibold mb-2">Valores</h5>
                    <p className="text-muted small">
                        Excelencia, compromiso, innovación, inclusión y desarrollo continuo guían cada uno de nuestros programas.
                    </p>
                    </div>
                </div>
                </div>

                <div className="porque-elegir text-start mx-auto p-5">
                <h5 className="text-center fw-semibold mb-4">¿Por qué elegir OTEC ProCapacita?</h5>

                <div className="row">
                    <div className="col-md-6">
                    <ul className="list-unstyled">
                        <li><i className="bi bi-check-circle me-2"></i>Certificación SENCE reconocida a nivel nacional</li>
                        <li><i className="bi bi-check-circle me-2"></i>Modalidades flexibles: presencial, online e híbrida</li>
                        <li><i className="bi bi-check-circle me-2"></i>Seguimiento personalizado durante todo el curso</li>
                        <li><i className="bi bi-check-circle me-2"></i>Infraestructura moderna y equipamiento de última generación</li>
                    </ul>
                    </div>
                    <div className="col-md-6">
                    <ul className="list-unstyled">
                        <li><i className="bi bi-check-circle me-2"></i>Docentes con experiencia práctica en la industria</li>
                        <li><i className="bi bi-check-circle me-2"></i>Material didáctico actualizado incluido</li>
                        <li><i className="bi bi-check-circle me-2"></i>Red de contactos profesionales y bolsa de trabajo</li>
                        <li><i className="bi bi-check-circle me-2"></i>Financiamiento disponible y convenios empresariales</li>
                    </ul>
                    </div>
                </div>
                </div>

            </div>
        </section>
  );
};

export default SobreNosotros;
