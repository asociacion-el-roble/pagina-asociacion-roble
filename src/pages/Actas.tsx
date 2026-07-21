import { useMemo, useState } from "react";
import { assetUrl, useContent } from "../lib/content";
import type { ActaYear, ActasContent } from "../types/content";

const fallbackActas: ActasContent = {
  juntaDirectiva: [],
  asambleaGeneral: [],
};

type SectionKey = "juntaDirectiva" | "asambleaGeneral";

const sections: Array<{ key: SectionKey; title: string; description: string }> = [
  {
    key: "juntaDirectiva",
    title: "Actas de Junta Directiva",
    description: "Reuniones ordinarias y acuerdos de Junta Directiva.",
  },
  {
    key: "asambleaGeneral",
    title: "Actas de Asamblea General",
    description: "Asambleas generales y actas extraordinarias.",
  },
];

function ActaList({ years }: { years: ActaYear[] }) {
  const sortedYears = useMemo(
    () =>
      [...years].sort((a, b) => Number(b.year || 0) - Number(a.year || 0)),
    [years],
  );

  if (sortedYears.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-lg text-slate-600 shadow-sm">
        Todavia no hay actas publicadas en este apartado.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {sortedYears.map((group) => (
        <section
          key={group.year}
          className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
        >
          <h3 className="bg-emerald-800 px-5 py-4 text-2xl font-bold text-white">
            Año {group.year}
          </h3>

          <div className="divide-y divide-slate-200">
            {group.items.map((acta) => {
              const hasFile = Boolean(acta.file);

              return (
                <article
                  key={`${group.year}-${acta.title}`}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h4 className="text-xl font-bold text-slate-950">
                      {acta.title}
                    </h4>
                    {acta.date && (
                      <p className="mt-1 text-slate-600">{acta.date}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    {hasFile ? (
                      <>
                        <a
                          href={assetUrl(acta.file)}
                          target="_blank"
                          rel="noreferrer"
                          className="rounded-md bg-emerald-700 px-5 py-3 text-center font-bold text-white transition hover:bg-emerald-800"
                        >
                          Ver PDF
                        </a>
                        <a
                          href={assetUrl(acta.file)}
                          download
                          className="rounded-md bg-slate-700 px-5 py-3 text-center font-bold text-white transition hover:bg-slate-800"
                        >
                          Descargar
                        </a>
                      </>
                    ) : (
                      <span className="rounded-md bg-slate-100 px-5 py-3 text-center font-bold text-slate-500">
                        PDF pendiente
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function Actas() {
  const [activeSection, setActiveSection] =
    useState<SectionKey>("juntaDirectiva");
  const { data: actas } = useContent<ActasContent>(
    "/content/actas.json",
    fallbackActas,
  );

  const selected = sections.find((section) => section.key === activeSection);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Documentos oficiales
          </p>
          <h1 className="mt-2 text-4xl font-bold">Actas</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Consulte y descargue las actas organizadas por tipo y por año.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-3 sm:grid-cols-2">
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => setActiveSection(section.key)}
              className={[
                "rounded-lg border p-5 text-left transition",
                activeSection === section.key
                  ? "border-emerald-700 bg-emerald-700 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300",
              ].join(" ")}
            >
              <span className="block text-2xl font-bold">{section.title}</span>
              <span className="mt-2 block text-base opacity-90">
                {section.description}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="mb-5 text-3xl font-bold text-slate-950">
            {selected?.title}
          </h2>
          <ActaList years={actas[activeSection]} />
        </div>
      </section>
    </main>
  );
}

export default Actas;
