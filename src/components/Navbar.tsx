import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio" },
  { to: "/informacion", label: "Informacion" },
  { to: "/actas", label: "Actas" },
  { to: "/noticias", label: "Noticias" },
  { to: "/galeria", label: "Galeria" },
  { to: "/calendario", label: "Calendario" },
  { to: "/contacto", label: "Contacto" },
];

function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-emerald-900/10 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
        <NavLink to="/" className="text-xl font-bold text-emerald-900">
          ADE El Roble
        </NavLink>

        <div className="flex gap-2 overflow-x-auto pb-1 text-base font-semibold md:flex-wrap md:justify-end md:overflow-visible md:pb-0">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "whitespace-nowrap rounded-md px-3 py-2 transition",
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-900",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/admin-login"
            className={({ isActive }) =>
              [
                "whitespace-nowrap rounded-md px-3 py-2 transition",
                isActive
                  ? "bg-slate-900 text-white"
                  : "border border-emerald-700 text-emerald-800 hover:bg-emerald-700 hover:text-white",
              ].join(" ")
            }
          >
            Admin
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
