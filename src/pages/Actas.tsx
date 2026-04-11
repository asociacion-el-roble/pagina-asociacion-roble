import { useState } from "react";

function Actas() {
  const [abierto, setAbierto] = useState<string | null>(null);

  const actas = {
    "2024": [
      {
        titulo: "Acta Asamblea General 2024",
        archivo: "/actas/acta1.pdf",
        tipo: "asamblea",
      },
    ],
    "2025": [
      {
        titulo: "Acta Asamblea General 2025",
        archivo: "/actas/acta1.pdf",
        tipo: "asamblea",
      },
    ],
  };

  const toggle = (year: string) => {
    setAbierto(abierto === year ? null : year);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Actas</h1>

      {Object.entries(actas).map(([year, lista]) => (
        <div key={year} className="mb-4">

          {/* BOTÓN DEL AÑO */}
          <button
            onClick={() => toggle(year)}
            className="w-full text-left bg-green-600 text-white p-4 rounded-lg text-xl font-semibold"
          >
            {year} {abierto === year ? "▲" : "▼"}
          </button>

          {/* CONTENIDO */}
          {abierto === year && (
            <div className="mt-3 space-y-3">
              {lista.map((acta, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <span className="text-lg">
                    {acta.titulo}
                  </span>

                  <div className="space-x-2">
                    <a
                      href={acta.archivo}
                      target="_blank"
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Ver
                    </a>

                    <a
                      href={acta.archivo}
                      download
                      className="bg-gray-600 text-white px-4 py-2 rounded"
                    >
                      Descargar
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  );
}

export default Actas;