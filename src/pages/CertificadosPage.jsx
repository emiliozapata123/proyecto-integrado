import { useEffect, useState } from "react";
import api from "../api/api";
import CertificadoList from "../components/Certificado/CertificadoList";

const CertificadosPage = () => {
    const [certs, setCerts] = useState([]);
    console.log("certificados: ",certs)

    useEffect(() => {
        getCertificados();
    }, []);

    const getCertificados = async () => {
        try {
            const response = await api("/registration/certificados/estudiante/");
            const data = await response.json();
            setCerts(data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container-fluid mt-4">
            <h3 className="fw-bold">Mis Certificados</h3>
            <p className="text-muted">Descarga y comparte tus logros académicos</p>

            {/* === TARJETAS RESUMEN === */}
            <div className="row mt-4 g-4">
                <div className="col-md-3">
                    <div className="p-4 text-center bg-white shadow-sm rounded-4">
                        <i className="bi bi-award fs-1 text-primary"></i>
                        <h3 className="fw-bold mt-3">{certs.length}</h3>
                        <p className="text-muted">Certificados</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="p-4 text-center bg-white shadow-sm rounded-4">
                        <i className="bi bi-clock-history fs-1 text-success"></i>
                        <h3 className="fw-bold mt-3">
                            {certs.reduce((acc, c) => acc + c.curso.horas, 0)}
                        </h3>
                        <p className="text-muted">Horas Certificadas</p>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="p-4 text-center bg-white shadow-sm rounded-4">
                        <i className="bi bi-calendar3 fs-1 text-purple"></i>
                        <h3 className="fw-bold mt-3">{new Date().getFullYear()}</h3>
                        <p className="text-muted">Año Activo</p>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                {certs.length === 0 ? (
                    <div className="alert alert-info p-4 rounded-4 fw-semibold text-center">
                        Aún no tienes certificados disponibles.
                    </div>
                ) : (
                    certs.map((c) => (
                        <CertificadoList key={c.id} cert={c} />
                    ))
                )}
            </div>

        </div>
    );
};

export default CertificadosPage;
