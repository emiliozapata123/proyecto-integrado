const Footer = () => {
  return (
    <footer className="footer text-light py-5">
        <div className="container">
            <div className="row gy-4">
            <div className="col-lg-4 col-md-6">
                <div className="d-flex align-items-center mb-3">
                <i className="bi bi-mortarboard fs-3 me-2"></i>
                <h5 className="fw-semibold mb-0">OTEC ProCapacita</h5>
                </div>
                <p className="text-secondary small mb-4">
                Transformando vidas a través de la educación desde 2009. Certificados por SENCE para entregar capacitación de excelencia.
                </p>

                <div className="d-flex gap-2">
                <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
                <a href="#" className="social-icon"><i className="bi bi-twitter"></i></a>
                </div>
            </div>

            <div className="col-lg-2 col-md-6">
                <h6 className="fw-semibold mb-3">Cursos</h6>
                <ul className="list-unstyled text-secondary small">
                <li><a href="#">Tecnología</a></li>
                <li><a href="#">Negocios</a></li>
                <li><a href="#">Gastronomía</a></li>
                <li><a href="#">Construcción</a></li>
                </ul>
            </div>

            <div className="col-lg-3 col-md-6">
                <h6 className="fw-semibold mb-3">Empresa</h6>
                <ul className="list-unstyled text-secondary small">
                <li><a href="#">Sobre Nosotros</a></li>
                <li><a href="#">Nuestro Equipo</a></li>
                <li><a href="#">Convenios</a></li>
                <li><a href="#">Trabaja con Nosotros</a></li>
                </ul>
            </div>

            <div className="col-lg-3 col-md-6">
                <h6 className="fw-semibold mb-3">Soporte</h6>
                <ul className="list-unstyled text-secondary small">
                <li><a href="#">Centro de Ayuda</a></li>
                <li><a href="#">Preguntas Frecuentes</a></li>
                <li><a href="#">Términos y Condiciones</a></li>
                <li><a href="#">Política de Privacidad</a></li>
                </ul>
            </div>
            </div>

            <hr className="mt-4 mb-3 text-secondary" />
            <div className="d-flex justify-content-between flex-wrap small text-secondary">
            <p className="mb-0">© 2025 OTEC ProCapacita. Todos los derechos reservados.</p>
            <p className="mb-0">Certificado SENCE N° 12345-2024</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;
