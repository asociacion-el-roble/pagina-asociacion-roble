function Contacto() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>

      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* INFO */}
        <div className="mb-6">
  <h2 className="text-xl font-semibold mb-2">
    Información de contacto
  </h2>

  <p>📍 Barrio El Roble</p>
  <p>📞 Teléfono: 8888-8888</p>
  <p>📧 Email: asociacionroble@gmail.com</p>

  {/* BOTÓN WHATSAPP */}
  <a
    href="https://wa.me/50688888888?text=Hola%20quiero%20información"
    target="_blank"
    className="block mt-4 bg-green-500 text-white text-center px-6 py-3 rounded-lg text-lg"
  >
    Contactar por WhatsApp
  </a>
</div>

        {/* FORMULARIO */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Nombre"
            className="w-full p-3 border rounded-lg"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            placeholder="Mensaje"
            className="w-full p-3 border rounded-lg"
            rows={4}
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg w-full"
          >
            Enviar mensaje
          </button>

        </form>

      </div>
    </div>
  );
}

export default Contacto;