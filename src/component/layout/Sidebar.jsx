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
    <aside className="w-64 bg-blue-700 text-white p-4">
      <h1 className="text-red-5000 text-5xl font-bold">HAPMS</h1>

      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-md px-3 py-2 transition ${
                isActive
                  ? "bg-white text-blue-700 font-semibold"
                  : "hover:bg-blue-600"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        className="mt-10 w-full rounded-md bg-red-500 px-3 py-2 hover:bg-red-600"
        type="button"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;