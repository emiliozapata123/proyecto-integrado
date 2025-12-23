import useMensaje from "../custom_hook/useMensaje";
import { useState } from "react";


const ModuloForm = ({addModulo, modulo, action, setMostrarModal,editModulo}) => {
    const {mensaje,cargarMensaje} = useMensaje();
    const [formulario, setFormulario] = useState({
        titulo:modulo?.titulo || "",
        descripcion:modulo?.descripcion || "",
    });

    const limpiarMensaje = (campo,mensaje) => {
        cargarMensaje(campo,mensaje);
        setTimeout(()=> {
            cargarMensaje(campo,"");
        },3000);

    };

    const handleChange = (campo,value) => {
        setFormulario(prev => ({
            ...prev,
            [campo]:value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let campoValido = true;

        if (!formulario.titulo){
            limpiarMensaje("titulo","ingrese titulo del curso");
            campoValido = false;
        }
        if (!formulario.descripcion){
            limpiarMensaje("descripcion","ingrese descripcion del curso");
            campoValido = false;
        }

        if (!campoValido) return;
        if (action === "form") {
            addModulo(formulario);
        } else if (action === "edit"){
            editModulo(modulo.id,formulario);
        }

        setMostrarModal(false);

    };

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Crear Nuevo Modulo</h5>
                        <button type="button" className="btn-close" onClick={()=> setMostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa los datos para agregar un nuevo modulo a la plataforma
                        </p>
                        <div className="mb-4">
                            <label className="fw-semibold">Titulo</label>
                            <input
                                className={`form-control ${mensaje.titulo?"is-invalid":""}`}
                                type="text"
                                value={formulario.titulo}
                                placeholder="Titulo del modulo..."
                                onChange={(e)=> handleChange("titulo",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.titulo}</div>

                        </div>

                        <div className="mb-4">
                            <label className="fw-semibold">Descripción</label>
                            <input
                                className={`form-control ${mensaje.descripcion?"is-invalid":""}`}
                                placeholder="Descripción detallada del modulo..."
                                type="text"
                                value={formulario.descripcion}
                                onChange={(e)=> handleChange("descripcion",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.descripcion}</div>

                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-dark w-100" type="button" onClick={()=> setMostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-dark w-100">{action === "edit" ? "Editar Modulo":"Crear Modulo"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default ModuloForm;