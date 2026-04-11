import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center">
        
        {/* LOGO */}
        <h1 className="text-2xl font-bold mb-2 md:mb-0">
          ADE EL ROBLE
        </h1>

        {/* MENU */}
        <div className="flex flex-wrap gap-4 text-lg">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/actas" className="hover:underline">Actas</Link>
          <Link to="/noticias" className="hover:underline">Noticias</Link>
          <Link to="/galeria" className="hover:underline">Galería</Link>
          <Link to="/contacto" className="hover:underline">Contacto</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;