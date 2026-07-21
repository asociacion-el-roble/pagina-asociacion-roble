import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import AdminLogin from "./pages/AdminLogin";
import Actas from "./pages/Actas";
import Calendario from "./pages/Calendario";
import Contacto from "./pages/Contacto";
import Galeria from "./pages/Galeria";
import Home from "./pages/Home";
import Informacion from "./pages/Informacion";
import Noticias from "./pages/Noticias";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/actas" element={<Actas />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </>
  );
}

export default App;
