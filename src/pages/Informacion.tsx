import { assetUrl, useContent } from "../lib/content";
import type { DocumentContent, DocumentItem, SiteContent } from "../types/content";

const siteFallback: SiteContent = {
  title: "Asociacion de Desarrollo El Roble",
  subtitle: "",
  welcome: "",
  mission: "",
  vision: "",
  values: [],
  tcuTitle: "Trabajo Comunal Universitario",
  tcuDescription: "",
  contact: {
    address: "",
    phone: "",
    email: "",
    whatsapp: "",
  },
};

const documentFallback: DocumentContent = {
  estatuto: { title: "Estatuto", file: "" },
  actaConstitutiva: { title: "Acta Constitutiva", file: "" },
  planTrabajo: [],
};

function DocumentLink({ document }: { document: DocumentItem }) {
  const hasFile = Boolean(document.file);

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-xl font-bold text-slate-950">{document.title}</h3>
        {document.year && (
          <p className="text-slate-600">Año {document.year}</p>
        )}
      </div>
      {hasFile ? (
        <a
          href={assetUrl(document.file)}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-emerald-700 px-5 py-3 text-center font-bold text-white transition hover:bg-emerald-800"
        >
          Abrir documento
        </a>
      ) : (
        <span className="rounded-md bg-slate-100 px-5 py-3 text-center font-bold text-slate-500">
          Pendiente
        </span>
      )}
    </div>
  );
}

function Informacion() {
  const { data: site } = useContent<SiteContent>(
    "/content/site.json",
    siteFallback,
  );
  const { data: documents } = useContent<DocumentContent>(
    "/content/documentos.json",
    documentFallback,
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Informacion institucional
          </p>
          <h1 className="mt-2 text-4xl font-bold">{site.title}</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            {site.welcome}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-2">
        <article className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-emerald-900">Mision</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {site.mission}
          </p>
        </article>

        <article className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-emerald-900">Vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-700">
            {site.vision}
          </p>
        </article>

        <article className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-3xl font-bold text-emerald-900">Valores</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {site.values.map((value) => (
              <span
                key={value}
                className="rounded-md bg-emerald-50 px-4 py-3 text-lg font-bold text-emerald-900"
              >
                {value}
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold text-slate-950">
            Documentos principales
          </h2>
          <div className="mt-6 grid gap-4">
            <DocumentLink document={documents.estatuto} />
            <DocumentLink document={documents.actaConstitutiva} />
            {documents.planTrabajo.map((document) => (
              <DocumentLink
                key={`${document.title}-${document.year}`}
                document={document}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-lg bg-emerald-50 p-6">
          <h2 className="text-3xl font-bold text-emerald-950">
            {site.tcuTitle}
          </h2>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-slate-700">
            {site.tcuDescription}
          </p>
        </div>
      </section>
    </main>
  );
}

export default Informacion;
