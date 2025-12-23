import { useState } from "react";
import useMensaje from "../custom_hook/useMensaje";
import api from "../../api/api";
import { NotifySuccess } from "../custom_hook/Notify";

const PreInscripcion = ({mostrarModal,cursoId}) => {
    const {cargarMensaje,mensaje} = useMensaje();

    const [formulario,setFormulario] = useState({
        nombre:"",
        apellidoPaterno:"",
        rut:"",
        correo:"",
        telefono:"",
        direccion:"",
        fechaNacimiento:""
    });

    const limpiarMensaje = (campo,mensaje) => {
        cargarMensaje(campo,mensaje);
        setTimeout(()=> {
            cargarMensaje(campo,"");
        },3000);

    }

    const handleChange = (campo,value) => {
        setFormulario(prev => ({
            ...prev,
            [campo]:value
        }));
    }

    const validarEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        let campoValido = true;

        if (!formulario.nombre) {
            limpiarMensaje("nombre","ingrese su nombre");
            campoValido = false;
        }
        if (!formulario.apellidoPaterno) {
            limpiarMensaje("apellidoPaterno","ingrese su apellidoPaterno");
            campoValido = false;
        }
        if (!formulario.apellidoMaterno) {
            limpiarMensaje("apellidoMaterno","ingrese su apellidoMaterno");
            campoValido = false;
        }
        if (!formulario.rut) {
            limpiarMensaje("rut","ingrese su rut");
            campoValido = false;
        }
        if (!formulario.correo) {
            limpiarMensaje("correo","ingrese su correo");
            campoValido = false;
        } else if (!validarEmail(formulario.correo)) {
            limpiarMensaje("correo","Formato de correo no válido");
            campoValido = false;
        }
        if (!formulario.telefono) {
            limpiarMensaje("telefono","ingrese su numero de telefono");
            campoValido = false;
        }
        if (!formulario.direccion) {
            limpiarMensaje("direccion","ingrese su direccion");
            campoValido = false;
        }
        if (formulario.rut.length > 10 || formulario.rut.length < 10) {
            limpiarMensaje("rut","rut debe tener 10 caracteres");
            campoValido = false;
        }
        if (formulario.telefono.length > 12 || formulario.telefono.length < 12) {
            limpiarMensaje("telefono","numero telefono debe tener 12 caracteres");
            campoValido = false;
        }
        if (!formulario.fechaNacimiento) {
            limpiarMensaje("fechaNacimiento","ingrese fecha de nacimiento");
            campoValido = false;
        }

        if (!campoValido) return;

        const form = {
            ...formulario,
            cursoInteres:cursoId
        }
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }

        addPreInscripcion(formData);
        mostrarModal(false);

    }

    const addPreInscripcion = async (preinscripcion) => {
        try{
            const response = await api("/preinscripcion/form/","POST",preinscripcion);
            NotifySuccess("Preinscripcion realizado con exito.");
            console.log(await response.json())

        }catch(e){
            console.error(e);
        }
    }

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">Formulario Inscripcion</h5>
                        <button type="button" className="btn-close" onClick={()=> mostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa los datos para agregar un nuevo curso a la plataforma
                        </p>

                        <div className="row mb-3">
                            <div className="mb-3 mb-md-0">
                                <label className="fw-semibold">Nombres</label>
                                <input type="text" 
                                className={`form-control ${mensaje.nombre?"is-invalid":""}`}
                                value={formulario.nombre}
                                placeholder="Nombres...."
                                onChange={(e)=> handleChange("nombre",e.target.value)}/>
                                <div className="invalid-feedback d-block">{mensaje.nombre}</div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Apellido Paterno</label>
                                <input
                                    type="text"
                                    className={`form-control ${mensaje.apellidoPaterno?"is-invalid":""}`}
                                    placeholder="Apellido Paterno...."
                                    onChange={(e)=> handleChange("apellidoPaterno",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.apellidoPaterno}</div>
                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold">Apellido Materno</label>
                                    <input
                                    type="text"
                                    className={`form-control ${mensaje.apellidoMaterno?"is-invalid":""}`}
                                    placeholder="Apellido Materno..."
                                    onChange={(e)=> handleChange("apellidoMaterno",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.apellidoMaterno}</div>

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Rut</label>
                                <input type="text" 
                                className={`form-control ${mensaje.rut?"is-invalid":""}`}
                                placeholder="Ej: 12345678-9"
                                onChange={(e)=> handleChange("rut",e.target.value)}/>
                                <div className="invalid-feedback d-block">{mensaje.rut}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="fw-semibold">Email</label>
                                <input 
                                    className={`form-control ${mensaje.correo?"is-invalid":""}`}
                                    placeholder="Ej: username123@gmail.com"
                                    onChange={(e)=> handleChange("correo",e.target.value)}/>
                                <div className="invalid-feedback d-block">{mensaje.correo}</div>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Telefono</label>
                                <input
                                type="text"
                                className={`form-control ${mensaje.telefono?"is-invalid":""}`}
                                placeholder="Numero de telefono"
                                onChange={(e)=> handleChange("telefono",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.telefono}</div>

                            </div>
                            
                            <div className="col-md-6">
                                <label className="fw-semibold">Direccion</label>
                                <input
                                type="text"
                                className={`form-control ${mensaje.direccion?"is-invalid":""}`}
                                placeholder="Direccion"
                                onChange={(e)=> handleChange("direccion",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.direccion}</div>

                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="mb-3 mb-md-0">
                                <label className="fw-semibold">Fecha Nacimiento</label>
                                <input type="date" 
                                className={`form-control ${mensaje.fechaNacimiento?"is-invalid":""}`}
                                value={formulario.fechaNacimiento}
                                onChange={(e)=> handleChange("fechaNacimiento",e.target.value)}/>
                                <div className="invalid-feedback d-block">{mensaje.fechaNacimiento}</div>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-dark w-100" type="button" onClick={()=> mostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-dark w-100">Inscribirse</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default PreInscripcion;