import { assetUrl, useContent } from "../lib/content";
import type { GalleryContent } from "../types/content";

function drivePreviewUrl(url: string) {
  const fileId = url.match(/\/file\/d\/([^/]+)/)?.[1];
  return fileId ? `https://drive.google.com/file/d/${fileId}/preview` : url;
}

function Galeria() {
  const { data: galeria } = useContent<GalleryContent>(
    "/content/galeria.json",
    { items: [], videos: [] },
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Comunidad en imagenes y videos
          </p>
          <h1 className="mt-2 text-4xl font-bold">Galeria</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Fotos y videos de actividades, proyectos y espacios compartidos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galeria.items.map((item) => (
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

        {galeria.items.length === 0 && (
          <div className="rounded-lg bg-white p-6 text-lg text-slate-600 shadow-sm">
            Todavia no hay fotos publicadas.
          </div>
        )}

        {galeria.videos.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-emerald-900">Videos</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {galeria.videos.map((video) => (
                <article
                  key={`${video.title}-${video.url}`}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <iframe
                    src={drivePreviewUrl(video.url)}
                    title={video.title}
                    className="aspect-video w-full border-0"
                    loading="lazy"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                  <h3 className="p-4 text-lg font-bold text-slate-800">
                    {video.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export default Galeria;
