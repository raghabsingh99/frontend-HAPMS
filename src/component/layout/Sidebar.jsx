import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Sidebar() {
  const { user } = useAuth();

  const adminMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
  ];

  const doctorMenu = [
    { label: "Dashboard", path: "/doctor-dashboard" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
  ];

  const menu = user?.role === "ADMIN" ? adminMenu : doctorMenu;

  return (
    <aside className="m-4 flex w-72 flex-col rounded-[28px] border border-white/10 bg-[#121a30]/95 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          HAPMS
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Hospital Dashboard
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-blue-600/90 to-indigo-500/90 text-white shadow-lg shadow-blue-900/30"
                  : "text-slate-300 hover:bg-white/6 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        className="mt-6 rounded-2xl border border-red-400/20 bg-red-500/15 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/25"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;