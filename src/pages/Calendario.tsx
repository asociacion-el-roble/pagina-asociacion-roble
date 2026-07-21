import { useContent } from "../lib/content";
import type { CalendarEvent, ListContent } from "../types/content";

function formatDate(date: string) {
  if (!date) {
    return "";
  }

  return new Intl.DateTimeFormat("es-CR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

function Calendario() {
  const { data: eventos } = useContent<ListContent<CalendarEvent>>(
    "/content/calendario.json",
    { items: [] },
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Actividades
          </p>
          <h1 className="mt-2 text-4xl font-bold">Calendario</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Fechas importantes, reuniones y eventos comunales.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="space-y-4">
          {eventos.items.map((event) => (
            <article
              key={`${event.title}-${event.date}`}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-lg font-bold text-emerald-800">
                {formatDate(event.date)}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">
                {event.title}
              </h2>
              <p className="mt-2 text-lg text-slate-600">
                {[event.time, event.place].filter(Boolean).join(" - ")}
              </p>
              {event.description && (
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  {event.description}
                </p>
              )}
            </article>
          ))}
        </div>

        {eventos.items.length === 0 && (
          <div className="rounded-lg bg-white p-6 text-lg text-slate-600 shadow-sm">
            No hay actividades publicadas por el momento.
          </div>
        )}
      </section>
    </main>
  );
}

export default Calendario;
