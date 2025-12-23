const RequisitoInscripcion = ({setVerRequisitos}) => {
    return (
        <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Requisitos Curso Guardia de Seguridad (GG.SS)</h5>
                        <button type="button" className="btn-close" onClick={() => setVerRequisitos(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p>1. Fotocopia de cédula de identidad vigente por ambos lados.</p>
                        <p>2. Certificado de antecedentes para fines especiales (vigencia máxima 30 días).</p>
                        <p>3. Certificado médico que indique: <strong>"Apto para trabajar como guardia de seguridad"</strong>.</p>
                        <p>4. Certificado psicológico o psiquiátrico (control de impulsos).</p>
                        <p>5. Certificado de estudios 4° Enseñanza Media aprobado (Mineduc).</p>
                        <p>6. Declaración jurada notarial (sin condenas según leyes indicadas).</p>
                        <p>7. Certificado de delegación provincial (Ley 19.327).</p>
                        <p>8. Certificado de residencia notarial o junta vecinal.</p>
                        <p>9. Pago 50% al inscribirse y 50% al inicio de clases.</p>
                        <p>10. Documentación obligatoria enviada a OS-10 Carabineros de Chile.</p>
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setVerRequisitos(false)}>
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RequisitoInscripcion;
{/* <div className="modal-body">
    <p>1. Fotocopia de cédula de identidad vigente por ambos lados (extranjeros con permanencia definitiva).</p>
    <p>2. Certificado de antecedentes para fines especiales (vigencia máxima 30 días).</p>
    <p>3. Certificado médico que indique: <strong>“Apto para trabajar como guardia de seguridad”</strong>.</p>
    <p>4. Certificado psicológico o psiquiátrico (control de impulsos).</p>
    <p>5. Certificado OS-10 último curso, vigente al rendir examen OS-10.</p>
    <p>6. Declaración jurada notarial (sin condenas según leyes indicadas).</p>
    <p>7. Certificado de delegación provincial (Ley 19.327).</p>
    <p>8. Certificado de residencia notarial o junta vecinal.</p>
    <p>9. Declaración simple de idoneidad comercial (se realiza en la oficina).</p>
    <p>10. Pago 50% al inscribirse y 50% al inicio de clases.</p>
    <p>
        11. La documentación es obligatoria y será enviada directamente a OS-10
        de Carabineros de Chile. La OTEC no conserva copias.
    </p>
</div> */}