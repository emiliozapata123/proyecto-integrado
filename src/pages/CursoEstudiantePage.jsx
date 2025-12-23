import { useEffect, useState } from "react";
import MyCourses from "../components/Estudiante/MyCourses";
import api from "../api/api";
import VerHorario from "../components/Horario/VerHorario";
import ModulosCurso from "../components/Estudiante/ModuloCurso";

const CursoEstudiantePage = () => {
    const [estudiante,setEstudiante] = useState([]);
    const [verHorario, setVerHorario] = useState(false);
    const [verCurso, setVerCurso] = useState(false)
    const [horario, setHorario] = useState([]);
    const [modulos, setModulos] = useState([]);
    const [materiales, setMateriales] = useState([]);
    const [curso, setCurso] = useState({});

    useEffect(()=> {
        getStudentCourses();
        cargarHorario();
    }, [verHorario]);

    const getStudentCourses = async () => {
        try {
            const response = await api("/registration/estudiante/inscripciones/");
            const data = await response.json();
            setEstudiante(data);
        } catch (e) {
            console.error(e);
        }
    }

    const pagarCurso = async (cursoId) => {
        try {
            const response = await api("/pago/iniciar/","POST",{curso_id:cursoId,alumno_id:estudiante.id});
            const data = await response.json();
            window.location.href = `${data.url}?token_ws=${data.token}`;

        } catch (e) {
            console.error(e);
        }
    }

    const cargarHorario = async () => {
        try {

            const response = await api(`/curso/${curso.id}/horario/list/`);
            const data = await response.json();
            setHorario(data);

        } catch (e) {
            console.error(e);
        }
    };

    const cargarModulos = async (id) => {
        try {
            const response = await api(`/curso/${id}/modulo/list/`);
            const data = await response.json();
            setModulos(data);

        } catch (e) {
            console.error(e);
        }
    }
    
    const cargarMateriales = async (id) => {
        try {
            const response = await api(`/curso/modulo/${id}/material/list/`);
            const data = await response.json();
            setMateriales(data);

        } catch (e) {
            console.error(e);
        }
    }


    return (
        <>
        <div className="container-fluid mt-4">
            <h4 className="fw-bold">Mis Cursos</h4>
            <p className="text-muted mb-4">Cursos en los que estás actualmente inscrito</p>

            <div className="row g-4">
                {estudiante.cursos?.map((curso) => (
                    <MyCourses 
                        curso={curso} 
                        verHorario={()=> {setVerHorario(true); setCurso(curso)}} 
                        verCurso={()=> {setVerCurso(true); cargarModulos(curso.id)}}
                        pagarCurso={pagarCurso}
                    />
                ))}
            </div>
        </div>
        {verHorario && 
            <VerHorario 
                curso={curso} 
                cerrar={()=> setVerHorario(false)} 
                context={"alumno"} 
                horario={horario}
            />
        }

        {verCurso &&
            <ModulosCurso
                modulos={modulos}
                verMaterial={cargarMateriales}
                cerrar={()=> setVerCurso(false)}
                materiales={materiales}
            
            />
        }
        </>
    );
};

export default CursoEstudiantePage;
