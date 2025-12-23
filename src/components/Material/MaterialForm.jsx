import useMensaje from "../custom_hook/useMensaje";
import { useState } from "react";

const MaterialForm = ({ addMaterial, setMostrarModal, action }) => {
    const {mensaje,cargarMensaje} = useMensaje();
    const [formulario, setFormulario] = useState({
        titulo: "",
        descripcion: "",
        archivo: null,
        link: "",
        tipo: ""
    });

    const limpiarMensaje = (campo,mensaje) => {
        cargarMensaje(campo,mensaje);
        setTimeout(()=> {
            cargarMensaje(campo,"");
        },3000);
    
    };

    const handleChange = (campo,value) => {
        setFormulario({ ...formulario, [campo]: value });
    };

    const handleFile = (e) => {
        setFormulario({ ...formulario, archivo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let campoValido = true;

        if (!formulario.titulo) {
            limpiarMensaje("titulo","ingresa titulo del material");
            campoValido = false;
        }
        if (!formulario.descripcion) {
            limpiarMensaje("descripcion","ingresa la descripcion del material");
            campoValido = false;
        }
        if (!formulario.archivo) {
            limpiarMensaje("archivo","ingresa un archivo del material");
            campoValido = false;
        }
        
        if (!formulario.tipo) {
            limpiarMensaje("tipo","selecciona el tipo de material");
            campoValido = false;
        }

        if (!campoValido) return;

        const data = new FormData();
        for (const key in formulario) data.append(key, formulario[key]);

        addMaterial(data);
        setMostrarModal(false);

    };

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Añadir nuevo material</h5>
                        <button type="button" className="btn-close" onClick={()=> setMostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa los datos para agregar un nuevo material a la plataforma
                        </p>
                        <div className="mb-4">
                            <label className="fw-semibold">Titulo</label>
                            <input
                                className={`form-control ${mensaje.titulo?"is-invalid":""}`}
                                type="text"
                                value={formulario.titulo}
                                placeholder="Titulo del material..."
                                onChange={(e)=> handleChange("titulo",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.titulo}</div>

                        </div>

                        <div className="mb-4">
                            <label className="fw-semibold">Descripción</label>
                            <input
                                className={`form-control ${mensaje.descripcion?"is-invalid":""}`}
                                placeholder="Descripción detallada del material..."
                                type="text"
                                value={formulario.descripcion}
                                onChange={(e)=> handleChange("descripcion",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.descripcion}</div>

                        </div>
                        
                        <div className="mb-4">
                            <label className="fw-semibold">Archivo</label>
                            <input
                                className={`form-control ${mensaje.archivo?"is-invalid":""}`}
                                type="file"
                                onChange={(e)=> handleFile(e)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.archivo}</div>

                        </div>
                        <div className="mb-4">
                            <label className="fw-semibold">Link</label>
                            <input
                                className={`form-control ${mensaje.link?"is-invalid":""}`}
                                placeholder="Link del material..."
                                type="url"
                                value={formulario.link}
                                onChange={(e)=> handleChange("link",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.link}</div>

                        </div>
                        <div className="mb-4">
                            <label className="fw-semibold">Tipo de Archivo</label>
                            <select className={`form-control ${mensaje.tipo?"is-invalid":""}`} value={formulario.tipo} onChange={(e)=> handleChange("tipo",e.target.value)}>
                                <option value="" disabled selected>Selecciona tipo de archivo</option>
                                <option value="PDF">PDF</option>
                                <option value="VIDEO">VIDEO</option>
                                <option value="LINK">LINK</option>
                                <option value="OTRO">OTRO</option>
                            </select>
                            <div className="invalid-feedback d-block">{mensaje.tipo}</div>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-dark w-100" type="button" onClick={()=> setMostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-dark w-100">{action === "edit" ? "Editar Modulo":"Añadir Material"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
export default MaterialForm;