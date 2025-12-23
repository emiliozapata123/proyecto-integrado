import Home from "./pages/Home";
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import DetalleCurso from "./components/gestion_curso/DetalleCurso";
import AdminPage from "./pages/AdminPage";
import TeacherPage from "./pages/TeacherPage";
import Login from "./components/acceso/Login";
import EstudiantePage from "./pages/EstudiantePage";
import PagoExitoso from "./components/Estudiante/PagoExitoso";
import PagoDenegado from "./components/Estudiante/PagoDenegado";
import "./App.css";
import Notify from "./components/custom_hook/Notify";



function App() {
    return (
        <>
        <Router>
            <Notify/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="detalle-curso/:id" element={<DetalleCurso/>}/>
                <Route path="admin/" element={<AdminPage/>}/>
                <Route path="teacher/" element={<TeacherPage/>}/>
                <Route path="login/" element={<Login/>}/>
                <Route path="estudiante/" element={<EstudiantePage/>}/>
                <Route path="pago-exitoso/" element={<PagoExitoso />} />
                <Route path="pago-denegado/" element={<PagoDenegado />} />
            </Routes>
        </Router>
        </>
    );
}

export default App;
