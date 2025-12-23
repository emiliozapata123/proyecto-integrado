import useMensaje from "../custom_hook/useMensaje";
import { useState } from "react";

const DocenteForm = ({mostrarModal,addDocente}) => {
    const {cargarMensaje,mensaje} = useMensaje();
    const [formulario, setFormulario] = useState({
        nombre:"",
        apellido:"",
        rut:"",
        email:"",
        telefono:"",
        especialidad:""
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

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let campoValido = true;

        if (!formulario.nombre){
            limpiarMensaje("nombre","ingrese nombre del curso");
            campoValido = false;
        }
        if (!formulario.apellido){
            limpiarMensaje("apellido","ingrese apellido");
            campoValido = false;
        }
        if (!formulario.rut){
            limpiarMensaje("rut","ingrese rut");
            campoValido = false;
        }
        if (formulario.rut.length > 10 || formulario.rut.length < 10) {
            limpiarMensaje("rut","rut debe tener 10 caracteres");
            campoValido = false;
        }
        if (!formulario.email){
            limpiarMensaje("email","ingrese email");
            campoValido = false;
        } else if (!validarEmail(formulario.email)) {
            limpiarMensaje("email","Formato de correo no válido");
            campoValido = false;
        }
        if (!formulario.telefono){
            limpiarMensaje("telefono","ingrese el telefono");
            campoValido = false;
        }
        if (!formulario.especialidad){
            limpiarMensaje("especialidad","ingrese la especialidad");
            campoValido = false;
        }
        if (!campoValido) return;

        addDocente(formulario);
        mostrarModal(false);
        
    };

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Agregar Nuevo Docente</h5>
                        <button type="button" className="btn-close" onClick={()=> mostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa la información del nuevo docente
                        </p>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Nombre</label>
                                <input
                                    type="text"
                                    className={`form-control ${mensaje.nombre?"is-invalid":""}`}
                                    placeholder="nombre del docente"
                                    onChange={(e)=> handleChange("nombre",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.nombre}</div>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold">Apellido</label>
                                <input
                                type="text"
                                className={`form-control ${mensaje.apellido?"is-invalid":""}`}
                                placeholder="apellido del docente"
                                onChange={(e)=> handleChange("apellido",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.apellido}</div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="fw-semibold">Rut</label>
                            <input type="text" 
                            className={`form-control ${mensaje.rut?"is-invalid":""}`}
                            placeholder="rut del docente"
                            onChange={(e)=> handleChange("rut",e.target.value)}/>
                            <div className="invalid-feedback d-block">{mensaje.rut}</div>
                        </div>
                        
                        <div className="mb-3">
                            <label className="fw-semibold">Email</label>
                            <input type="email" 
                            className={`form-control ${mensaje.email?"is-invalid":""}`}
                            placeholder="email del docente"
                            onChange={(e)=> handleChange("email",e.target.value)}/>
                            <div className="invalid-feedback d-block">{mensaje.email}</div>
                        </div>
                        <div className="mb-3">
                            <label className="fw-semibold">Telefono</label>
                            <input type="text" 
                                className={`form-control ${mensaje.telefono?"is-invalid":""}`}
                                placeholder="telefono del docente"
                                onChange={(e)=> handleChange("telefono",e.target.value)}/>
                            <div className="invalid-feedback d-block">{mensaje.telefono}</div>
                        </div>
                        <div className="mb-3">
                            <label className="fw-semibold">Espacialidad</label>
                            <input type="text" 
                            className={`form-control ${mensaje.telefono?"is-invalid":""}`}
                            placeholder="Ej: programacion web"
                            onChange={(e)=> handleChange("especialidad",e.target.value)}/>
                            <div className="invalid-feedback d-block">{mensaje.especialidad}</div>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-dark w-100" type="button" onClick={()=> mostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-dark w-100">Agregar Docente</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default DocenteForm;