const Contacto = () => {
  return (
    <section className="contacto-section py-5">
        <h6 className="text-center mb-4">Contactanos</h6>
        <h5 className="text-center mb-5">¿Tienes preguntas? Estamos aquí para ayudarte</h5>
        <div className="container">
            <div className="row g-4">
            {/* 📨 Formulario */}
            <div className="col-lg-8">
                <div className="card border-light shadow-sm p-4">
                <h5 className="fw-semibold mb-4">Envíanos un Mensaje</h5>
                <form>
                    <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Nombre *</label>
                        <input
                        type="text"
                        className="form-control campo-input"
                        placeholder="Tu nombre"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Email *</label>
                        <input
                        type="email"
                        className="form-control campo-input"
                        placeholder="tu@email.com"
                        />
                    </div>
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input
                        type="text"
                        className="form-control campo-input"
                        placeholder="+56 9 1234 5678"
                    />
                    </div>

                    <div className="mb-3">
                    <label className="form-label">Mensaje *</label>
                    <textarea
                        rows="4"
                        className="form-control campo-input"
                        placeholder="Escribe tu consulta aquí..."
                    ></textarea>
                    </div>

                    <button type="submit" className="btn btn-dark w-100 fw-semibold mt-2">
                    Enviar Mensaje
                    </button>
                </form>
                </div>
            </div>

            {/* 📍 Información */}
            <div className="col-lg-4">
                <div className="info-card card border-light shadow-sm p-4 mb-3">
                <div className="d-flex align-items-start">
                    <div className="icon-box me-3">
                    <i className="bi bi-geo-alt"></i>
                    </div>
                    <div>
                    <h6 className="fw-semibold mb-1">Dirección</h6>
                    <p className="text-muted small mb-0">
                        Av. Libertador Bernardo O'Higgins 1234<br />
                        Santiago Centro, Chile
                    </p>
                    </div>
                </div>
                </div>

                <div className="info-card card border-light shadow-sm p-4 mb-3">
                <div className="d-flex align-items-start">
                    <div className="icon-box me-3">
                    <i className="bi bi-telephone"></i>
                    </div>
                    <div>
                    <h6 className="fw-semibold mb-1">Teléfono</h6>
                    <p className="text-muted small mb-0">+56 2 2345 6789</p>
                    <p className="text-muted small mb-0">+56 9 8765 4321</p>
                    </div>
                </div>
                </div>

                <div className="info-card card border-light shadow-sm p-4 mb-3">
                <div className="d-flex align-items-start">
                    <div className="icon-box me-3">
                    <i className="bi bi-envelope"></i>
                    </div>
                    <div>
                    <h6 className="fw-semibold mb-1">Email</h6>
                    <p className="text-muted small mb-0">contacto@procapacita.cl</p>
                    <p className="text-muted small mb-0">admision@procapacita.cl</p>
                    </div>
                </div>
                </div>

                <div className="info-card card border-light shadow-sm p-4">
                <div className="d-flex align-items-start">
                    <div className="icon-box me-3">
                    <i className="bi bi-clock"></i>
                    </div>
                    <div>
                    <h6 className="fw-semibold mb-1">Horario de Atención</h6>
                    <p className="text-muted small mb-0">Lunes a Viernes: 9:00 - 18:00</p>
                    <p className="text-muted small mb-0">Sábados: 10:00 - 14:00</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  );
};

export default Contacto;
