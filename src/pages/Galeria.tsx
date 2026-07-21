import { assetUrl, useContent } from "../lib/content";
import type { GalleryItem, ListContent } from "../types/content";

function Galeria() {
  const { data: imagenes } = useContent<ListContent<GalleryItem>>(
    "/content/galeria.json",
    { items: [] },
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Comunidad en imagenes
          </p>
          <h1 className="mt-2 text-4xl font-bold">Galeria</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Fotos de actividades, proyectos y espacios compartidos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {imagenes.items.map((item) => (
            <figure
              key={`${item.title}-${item.image}`}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={assetUrl(item.image)}
                alt={item.title}
                className="h-72 w-full object-cover"
              />
              <figcaption className="p-4 text-lg font-bold text-slate-800">
                {item.title}
              </figcaption>
            </figure>
          ))}
        </div>

        {imagenes.items.length === 0 && (
          <div className="rounded-lg bg-white p-6 text-lg text-slate-600 shadow-sm">
            Todavia no hay fotos publicadas.
          </div>
        )}
      </section>
    </main>
  );
}

export default Galeria;
