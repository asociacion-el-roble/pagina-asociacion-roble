import { assetUrl, useContent } from "../lib/content";
import type { ListContent, NewsItem } from "../types/content";

function formatDate(date: string) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("es-CR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function Noticias() {
  const { data: noticias } = useContent<ListContent<NewsItem>>(
    "/content/noticias.json",
    { items: [] },
  );
  const orderedNews = [...noticias.items].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Avisos comunales
          </p>
          <h1 className="mt-2 text-4xl font-bold">Noticias</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Informacion importante sobre actividades, proyectos y comunicados.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {orderedNews.map((noticia) => (
            <article
              key={`${noticia.title}-${noticia.date}`}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={assetUrl(noticia.image)}
                alt={noticia.title}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <p className="text-sm font-bold uppercase tracking-wide text-emerald-700">
                  {formatDate(noticia.date)}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-950">
                  {noticia.title}
                </h2>
                <p className="mt-3 text-lg leading-relaxed text-slate-600">
                  {noticia.summary}
                </p>
              </div>
            </article>
          ))}
        </div>

        {noticias.items.length === 0 && (
          <div className="rounded-lg bg-white p-6 text-lg text-slate-600 shadow-sm">
            Todavia no hay noticias publicadas.
          </div>
        )}
      </section>
    </main>
  );
}

export default Noticias;
