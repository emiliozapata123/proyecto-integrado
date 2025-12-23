import { useState } from "react";
import useMensaje from "../custom_hook/useMensaje";
import useFetch from "../custom_hook/useFetch";

const CursoFormModal = ({curso, context, mostrarModal,addCurso, updateCurso}) => {
    const {cargarMensaje,mensaje} = useMensaje();
    const {data:docentes} = useFetch("/registration/docente/list/");
    const [formulario, setFormulario] = useState({
        nombre:curso?.nombre || "",
        descripcion:curso?.descripcion || "",
        cupo:curso?.cupo || "",
        horas:curso?.horas || "",
        precio:curso?.precio || "",
        docente:"",
        categoria:curso?.categoria || "",
        imagen:""
    });

    console.log(docentes)

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

        if (!formulario.nombre){
            limpiarMensaje("nombre","ingrese nombre del curso");
            campoValido = false;
        }
        if (!formulario.descripcion){
            limpiarMensaje("descripcion","ingrese descripcion del curso");
            campoValido = false;
        }
    
        if (formulario.cupo <= 0){
            limpiarMensaje("cupo","ingrese una cantidad valida de cupo");
            campoValido = false;
        }
        if (formulario.horas <=0){
            limpiarMensaje("horas","ingrese cantidad de horas valida");
            campoValido = false;
        }
        if (formulario.precio <= 0){
            limpiarMensaje("precio","precio no valido");
            campoValido = false;
        }
        if (!formulario.categoria){
            limpiarMensaje("categoria","seleccione una categoria");
            campoValido = false;
        }
        if (context !== "editar" && !formulario.imagen){
            limpiarMensaje("imagen","seleccione una imagen");
            campoValido = false;
        }

        if (!campoValido) return;

        const formData = new FormData();
        for (const key in formulario) {
            if (key === "imagen" && formulario[key] === "") continue;
            if (key === "docente" && formulario[key] === "") continue;
            formData.append(key, formulario[key]);
        }
        
        if (context === "editar") {
            updateCurso(curso.id,formData);
            mostrarModal(false);

        } else {
            addCurso(formData);
            mostrarModal(false);
        }
    };

    return (
        <form className="modal fade show d-block" tabIndex="-1" onSubmit={handleSubmit}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow rounded-4">
                    <div className="modal-header border-0 pb-0">
                        <h5 className="modal-title fw-bold">{context === "editar" ? "Editar Curso":"Crear Nuevo Curso"}</h5>
                        <button type="button" className="btn-close" onClick={()=> mostrarModal(false)}></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-2">
                        Completa los datos para agregar un nuevo curso a la plataforma
                        </p>

                        <div className="mb-3">
                            <label className="fw-semibold">Nombre del Curso</label>
                            <input
                                type="text"
                                className={`form-control ${mensaje.nombre?"is-invalid":""}`}
                                value={formulario.nombre}
                                placeholder="Ej: Programación Python Avanzado"
                                onChange={(e)=> handleChange("nombre",e.target.value)}
                            />
                            <div className="invalid-feedback d-block">{mensaje.nombre}</div>

                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Categoría</label>
                                <select className={`form-control ${mensaje.categoria?"is-invalid":""}`} value={formulario.categoria} onChange={(e)=> handleChange("categoria",e.target.value)}>
                                    <option>Seleccionar</option>
                                    <option>Seguridad maritima</option>
                                    <option>Seguridad privada</option>
                                    <option>os-10</option>
                                </select>
                                <div className="invalid-feedback d-block">{mensaje.categoria}</div>

                            </div>

                            <div className="col-md-6">
                                <label className="fw-semibold">Duración</label>
                                <input
                                type="number"
                                className={`form-control ${mensaje.horas?"is-invalid":""}`}
                                value={formulario.horas}
                                placeholder="Ej: 80 horas"
                                onChange={(e)=> handleChange("horas",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.horas}</div>

                            </div>

                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Cupos de curso</label>
                                <input type="text" 
                                className={`form-control ${mensaje.cupo?"is-invalid":""}`}
                                value={formulario.cupo}
                                placeholder="Ej: 30"
                                onChange={(e)=> handleChange("cupo",e.target.value)}/>
                                <div className="invalid-feedback d-block">{mensaje.cupo}</div>
                            </div>
                            <div className="col-md-6">
                                <label className="fw-semibold">Docente Asignado (Opcional)</label>
                                <select className="form-control" value={formulario.docente} onChange={(e)=> handleChange("docente",e.target.value)}>
                                    <option value={""} disabled selected>Seleccionar</option>
                                    {docentes?.map((d)=> (
                                        <option key={d.id} value={d.id}>{d.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="fw-semibold">Precio</label>
                                <input
                                type="number"
                                className={`form-control ${mensaje.precio?"is-invalid":""}`}
                                value={formulario.precio}
                                placeholder="Ej: 350000"
                                onChange={(e)=> handleChange("precio",e.target.value)}
                                />
                                <div className="invalid-feedback d-block">{mensaje.precio}</div>
                            </div>
                            
                            <div className="col-md-6">
                                <label className="fw-semibold">Imagen</label>
                                <input
                                type="file"
                                className={`form-control ${mensaje.imagen?"is-invalid":""}`}
                                onChange={(e)=> handleChange("imagen",e.target.files[0])}
                                />
                                <div className="invalid-feedback d-block">{mensaje.imagen}</div>

                            </div>
                        </div>
                        

                        <div className="mb-4">
                            <label className="fw-semibold">Descripción</label>
                            <textarea
                                className={`form-control ${mensaje.descripcion?"is-invalid":""}`}
                                rows="2"
                                value={formulario.descripcion}
                                placeholder="Descripción detallada del curso..."
                                onChange={(e)=> handleChange("descripcion",e.target.value)}
                            ></textarea>
                            <div className="invalid-feedback d-block">{mensaje.descripcion}</div>

                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <button className="btn btn-outline-dark w-100"type="button" onClick={()=> mostrarModal(false)}>Cancelar</button>
                            <button className="btn btn-dark w-100">Guardar Curso</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default CursoFormModal;