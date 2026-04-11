function Noticias() {
  const noticias = [
    {
      titulo: "Nueva actividad comunitaria",
      descripcion: "Se realizará una jornada de limpieza este fin de semana.",
      fecha: "10 Abril 2026",
      imagen: "https://via.placeholder.com/400",
    },
    {
      titulo: "Reunión importante",
      descripcion: "Se convoca a todos los vecinos a reunión general.",
      fecha: "5 Abril 2026",
      imagen: "https://via.placeholder.com/400",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Noticias</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {noticias.map((noticia, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={noticia.imagen}
              alt="noticia"
              className="w-full h-48 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">
                {noticia.titulo}
              </h2>

              <p className="text-gray-600 mb-2">
                {noticia.descripcion}
              </p>

              <span className="text-sm text-gray-500">
                {noticia.fecha}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Noticias;