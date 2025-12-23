import ModuloList from "../components/Modulo/ModuloList";
import { useState, useEffect } from "react";
import api from "../api/api";
import MaterialForm from "../components/Material/MaterialForm";
import MaterialList from "../components/Material/MaterialList";

const MaterialPage = ({curso}) => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [modulos, setModulos] = useState([]);
    const [material, setMaterial] = useState([]);
    console.log(mostrarModal)

    useEffect(()=> {
        getModulos();
        if (mostrarModal.action === "list") {
            getMaterialModule();
        }
    }, [mostrarModal]);

    const getModulos = async () => {
        try {
            const response = await api(`/curso/${curso.id}/modulo/list/`);
            const data = await response.json();
            setModulos(data);
            
        } catch (e){
            console.error(e);
        }
    }

    const addMaterial = async (newMaterial) => {
        const id = mostrarModal.data.id;
        try {
            const response = await api(`/curso/modulo/${id}/material/form/`,"POST",newMaterial);
            const data = await response.json();
            setMaterial(data);
            
        } catch (e){
            console.error(e);
        }
    }

    const getMaterialModule = async () => {
        const id = mostrarModal.data.id;
        try {
            const response = await api(`/curso/modulo/${id}/material/list/`);
            const data = await response.json();
            setMaterial(data);
            
        } catch (e){
            console.error(e);
        }
    }

    return (
        <div className="modulos table-responsive">
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
                                    context={"material"}
                                    setMostrarModal={(action)=> setMostrarModal({data:m,action:action,open:true,message:"material"})}
                                />
                            )
                        )}
                    </tbody>
                </table>
            </div>
            {mostrarModal.action === "form" && <MaterialForm setMostrarModal={setMostrarModal} addMaterial={addMaterial}/>}
            {mostrarModal.action === "list" && <MaterialList materiales={material} setMostrarModal={setMostrarModal}/>}
        </div>
    )
}
export default MaterialPage;