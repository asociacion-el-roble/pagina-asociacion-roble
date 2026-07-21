import { FormEvent, useState } from "react";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "Roble2026";

function AdminLogin() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const adminUrl = `${import.meta.env.BASE_URL}admin/`;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user.trim() === ADMIN_USER && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("robleAdminAuthed", "true");
      window.location.href = adminUrl;
      return;
    }

    setError("Usuario o contrasena incorrectos.");
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-emerald-900 px-4 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="text-lg font-semibold text-emerald-100">
            Acceso privado
          </p>
          <h1 className="mt-2 text-4xl font-bold">Administrador</h1>
          <p className="mt-4 max-w-3xl text-xl leading-relaxed text-emerald-50">
            Entrada para modificar, subir o eliminar actas, reuniones,
            noticias, fotos y contenido del sitio.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Ingresar como admin
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-slate-700">
            Si tiene permiso de administrador, escriba el usuario y la
            contrasena para abrir el panel. Las personas visitantes no necesitan
            iniciar sesion para ver actas, reuniones o informacion publica.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 max-w-xl space-y-4">
            <div>
              <label
                htmlFor="admin-user"
                className="block text-base font-bold text-slate-800"
              >
                Usuario
              </label>
              <input
                id="admin-user"
                value={user}
                onChange={(event) => setUser(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-lg outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
                autoComplete="username"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="block text-base font-bold text-slate-800"
              >
                Contrasena
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-md border border-slate-300 px-4 py-3 text-lg outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/20"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-4 py-3 font-semibold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-md bg-emerald-700 px-6 py-3 text-center text-lg font-bold text-white transition hover:bg-emerald-800 sm:w-auto"
            >
              Entrar al panel admin
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="#/actas"
              className="rounded-md border border-slate-300 px-6 py-3 text-center text-lg font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
            >
              Ver actas sin login
            </a>
            <a
              href="#/calendario"
              className="rounded-md border border-slate-300 px-6 py-3 text-center text-lg font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
            >
              Ver reuniones
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AdminLogin;
