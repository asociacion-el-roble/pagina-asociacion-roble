import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO */}
      <div className="bg-green-600 text-white text-center py-16 px-4">
        <h1 className="text-4xl font-bold mb-4">
          Asociación de Desarrollo El Roble
        </h1>
        <p className="text-lg">
          Trabajando por el bienestar de nuestra comunidad
        </p>
      </div>

      {/* SECCIONES PRINCIPALES */}
      <div className="max-w-5xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 p-4">

        {/* ACTAS */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Actas</h2>
          <p>Consulta documentos oficiales de la asociación</p>
          
          <Link to="/actas">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
              Ver Actas
            </button>
          </Link>
        </div>

        {/* NOTICIAS */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Noticias</h2>
          <p>Entérate de las actividades y avisos importantes</p>
          
          <Link to="/noticias">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
              Ver Noticias
            </button>
          </Link>
        </div>

        {/* GALERÍA */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Galería</h2>
          <p>Fotos de actividades y eventos comunitarios</p>
          
          <Link to="/galeria">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
              Ver Galería
            </button>
          </Link>
        </div>

        {/* CONTACTO */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-bold mb-2">Contacto</h2>
          <p>Ponte en contacto con la asociación</p>
          
          <Link to="/contacto">
            <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
              Ir a Contacto
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;