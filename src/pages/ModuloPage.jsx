import { useEffect, useState } from "react";
import ModuloForm from "../components/Modulo/ModuloForm";
import ModuloList from "../components/Modulo/ModuloList";
import api from "../api/api";
import { NotifySuccess } from "../components/custom_hook/Notify";
import ModalEliminar from "../components/layout/ModalEliminar";

const ModuloPage = ({curso}) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modulos, setModulos] = useState([]);
    console.log(mostrarModal)

    useEffect(()=> {
        getModulos();
    }, []);

    const getModulos = async () => {
        try {
            const response = await api(`/curso/${curso.id}/modulo/list/`);
            const data = await response.json();
            setModulos(data);
            
        } catch (e){
            console.error(e);
        }
    }

    const addModulo = async (newModule) => {
        try {
            const response = await api(`/curso/modulo/${curso}/form/`,"POST",newModule);
            const data = await response.json();
            setModulos(data);
            NotifySuccess("Modulo Creado Exitosamente.");

        } catch (e){
            console.error(e);
        }
    }

    const deleteModulo = async (id) => {
        try {
            await api(`/curso/modulo/${id}/delete/`,"DELETE");
            getModulos();
            NotifySuccess("Modulo Eliminado Exitosamente.");
            setMostrarModal(false);

        } catch (e){
            console.error(e);
        }
    }

    const editModulo = async (id,data) => {
        try {
            await api(`/curso/modulo/${id}/update/`,"PUT",data);
            getModulos();
            NotifySuccess("Modulo Editado Exitosamente.");
            setMostrarModal(false);

        } catch (e){
            console.error(e);
        }
    }

    

    return (
        <div className="modulos table-responsive">
            <div className="d-flex justify-content-between mb-3">
                <h4>Módulos del curso</h4>
                <button className="btn btn-primary" onClick={()=> setMostrarModal({action:"form"})}>
                    + Crear Módulo
                </button>
            </div>
            <div className="modulos-scroll table-responsive">
                <table className="table table-hover align-middle shadow-sm rounded-3 w-100">
                    <thead className="table-light sticky-top">
                    <tr>
                        <th>Módulo</th>
                        <th>Descripción</th>
                        <th>Orden</th>
                        <th className="text-end">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {modulos.length === 0 ? (
                        <tr>
                        <td colSpan="4" className="text-center text-muted py-4">
                            No hay módulos registrados.
                        </td>
                        </tr>
                    ) : (
                        modulos.map((m) => 
                            <ModuloList 
                                key={m.id} 
                                modulo={m} 
                                context={"modulo"}
                                setMostrarModal={(action)=> setMostrarModal({data:m,action:action,open:true,message:"modulo"})}
                            />
                        )
                    )}
                    </tbody>
                </table>
            </div>
            {(mostrarModal.action === "edit" || mostrarModal.action === "form") && (
                <ModuloForm
                   setMostrarModal={setMostrarModal} 
                   addModulo={addModulo}
                   modulo={mostrarModal.data}
                   editModulo={(id,formulario)=> editModulo(id,formulario)}
                   action={mostrarModal.action}

               />
            )}

            {mostrarModal.action === "delete" && 
                <ModalEliminar 
                    mostrarModal={setMostrarModal} 
                    handleDelete={deleteModulo} 
                    message={mostrarModal.message}
                    data={mostrarModal.data}
                />
            }
        </div>
        
    )
}
export default ModuloPage;