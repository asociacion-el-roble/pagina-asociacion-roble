function Galeria() {
  const imagenes = [
    "/galeria/foto1.avif",
    "/galeria/foto2.avif",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Galería</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {imagenes.map((img, index) => (
          <div key={index} className="bg-white rounded-xl shadow overflow-hidden">
            <img
              src={img}
              alt="galeria"
              className="w-full h-64 object-cover hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galeria;