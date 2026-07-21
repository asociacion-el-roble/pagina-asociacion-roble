import { useContent } from "../lib/content";
import type { SiteContent } from "../types/content";

const fallback: SiteContent = {
  title: "Asociacion de Desarrollo El Roble",
  subtitle: "",
  welcome: "",
  mission: "",
  vision: "",
  values: [],
  tcuTitle: "",
  tcuDescription: "",
  contact: {
    address: "Barrio El Roble",
    phone: "8888-8888",
    email: "asociacionroble@gmail.com",
    whatsapp: "50688888888",
  },
};

function Contacto() {
  const { data: site } = useContent<SiteContent>("/content/site.json", fallback);
  const { contact } = site;
  const whatsappUrl = `https://wa.me/${contact.whatsapp}?text=Hola%20quiero%20informacion%20sobre%20ADE%20El%20Roble`;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-lg font-semibold text-emerald-100">
            Medios de contacto
          </p>
          <h1 className="mt-2 text-4xl font-bold">Contacto</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Escribanos para consultas, avisos o informacion comunal.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-emerald-900">
            Datos de contacto
          </h2>
          <div className="mt-6 space-y-4 text-lg text-slate-700">
            <p>
              <strong>Direccion:</strong> {contact.address}
            </p>
            <p>
              <strong>Telefono:</strong> {contact.phone}
            </p>
            <p>
              <strong>Correo:</strong>{" "}
              <a className="text-emerald-800 underline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 block rounded-md bg-emerald-700 px-6 py-4 text-center text-lg font-bold text-white transition hover:bg-emerald-800"
          >
            Contactar por WhatsApp
          </a>
        </aside>

        <form
          action={`mailto:${contact.email}`}
          method="post"
          encType="text/plain"
          className="rounded-lg bg-white p-6 shadow-sm"
        >
          <h2 className="text-3xl font-bold text-emerald-900">
            Formulario de contacto
          </h2>

          <div className="mt-6 grid gap-4">
            <label className="grid gap-2 text-lg font-bold text-slate-800">
              Nombre
              <input
                type="text"
                name="nombre"
                required
                className="rounded-md border border-slate-300 p-4 font-normal"
              />
            </label>

            <label className="grid gap-2 text-lg font-bold text-slate-800">
              Correo electronico
              <input
                type="email"
                name="correo"
                required
                className="rounded-md border border-slate-300 p-4 font-normal"
              />
            </label>

            <label className="grid gap-2 text-lg font-bold text-slate-800">
              Mensaje
              <textarea
                name="mensaje"
                required
                rows={5}
                className="rounded-md border border-slate-300 p-4 font-normal"
              />
            </label>

            <button
              type="submit"
              className="rounded-md bg-emerald-700 px-6 py-4 text-lg font-bold text-white transition hover:bg-emerald-800"
            >
              Enviar mensaje
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Contacto;
