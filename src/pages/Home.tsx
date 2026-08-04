import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";
import { assetUrl, useContent } from "../lib/content";
import type {
  CalendarEvent,
  ListContent,
  NewsItem,
  SiteContent,
} from "../types/content";

const siteFallback: SiteContent = {
  title: "Asociacion de Desarrollo El Roble",
  subtitle:
    "Informacion comunal, documentos oficiales, actividades y contacto para el barrio El Roble.",
  welcome:
    "Bienvenidos a ADE Del Roble. Aqui encuentras noticias, eventos, proyectos y documentos importantes.",
  mission: "",
  vision: "",
  values: [],
  tcuTitle: "Trabajo Comunal Universitario",
  tcuDescription: "",
  contact: {
    address: "Barrio El Roble",
    phone: "8888-8888",
    email: "asociacionroble@gmail.com",
    whatsapp: "50688888888",
  },
};

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

function Home() {
  const { data: site } = useContent<SiteContent>(
    "/content/site.json",
    siteFallback,
  );
  const { data: news } = useContent<ListContent<NewsItem>>(
    "/content/noticias.json",
    { items: [] },
  );
  const { data: events } = useContent<ListContent<CalendarEvent>>(
    "/content/calendario.json",
    { items: [] },
  );

  const latestNews = [...news.items]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);
  const nextEvents = events.items.slice(0, 2);

  return (
    <main>
      <section
        className="relative min-h-[520px] overflow-hidden bg-emerald-950 text-white"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(6, 78, 59, 0.92), rgba(6, 78, 59, 0.68)), url(${heroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center px-4 py-14">
          <div className="max-w-3xl">
            <p className="mb-4 text-lg font-semibold text-emerald-100">
              Asociacion comunal
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              {site.title}
            </h1>
            <p className="mt-5 max-w-2xl text-xl leading-relaxed text-emerald-50">
              {site.subtitle}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/actas"
                className="rounded-md bg-white px-6 py-4 text-center text-lg font-bold text-emerald-900 shadow-sm transition hover:bg-emerald-50"
              >
                Ver actas
              </Link>
              <Link
                to="/contacto"
                className="rounded-md border border-white/70 px-6 py-4 text-center text-lg font-bold text-white transition hover:bg-white/10"
              >
                Contactar
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-3">
        <Link
          to="/informacion"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-emerald-900">
            Informacion institucional
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Mision, vision, valores, estatuto, plan de trabajo y TCU.
          </p>
        </Link>

        <Link
          to="/actas"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-emerald-900">
            Actas por año
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Junta Directiva y Asamblea General en apartados separados.
          </p>
        </Link>

        <Link
          to="/galeria"
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
        >
          <h2 className="text-2xl font-bold text-emerald-900">
            Fotos y noticias
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Actividades, avisos y recuerdos de la comunidad.
          </p>
        </Link>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="text-3xl font-bold text-slate-950">
              Ultimas noticias
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {latestNews.map((item) => (
                <article
                  key={item.title}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50"
                >
                  <img
                    src={assetUrl(item.image)}
                    alt={item.title}
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-5">
                    <p className="text-sm font-semibold text-emerald-700">
                      {formatDate(item.date)}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-slate-600">{item.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="rounded-lg border border-emerald-100 bg-emerald-50 p-6">
            <h2 className="text-3xl font-bold text-emerald-950">
              Proximas actividades
            </h2>
            <div className="mt-5 space-y-4">
              {nextEvents.map((event) => (
                <div key={`${event.title}-${event.date}`} className="bg-white p-4">
                  <p className="font-bold text-emerald-900">
                    {formatDate(event.date)}
                  </p>
                  <h3 className="text-xl font-bold">{event.title}</h3>
                  <p className="text-slate-600">
                    {[event.time, event.place].filter(Boolean).join(" - ")}
                  </p>
                </div>
              ))}
              {nextEvents.length === 0 && (
                <p className="text-lg text-slate-700">
                  No hay actividades publicadas por el momento.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Home;
