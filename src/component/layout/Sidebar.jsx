import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { logoutUser } from "../../features/auth/api";

function Sidebar() {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { user, logout, refreshToken } = useAuth();

  const adminMenu = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
    { label: "Book Appointment", path: "/appointments/book" },
    { label: "Doctor Slots", path: "/slots" },
    { label: "Schedule Generator", path: "/schedule-generator" },
    { label: "Lab Reports", path: "/lab-reports" },
    { label: "Reports", path: "/reports" },
  ];

  const doctorMenu = [
    { label: "Dashboard", path: "/doctor-dashboard" },
    { label: "Patients", path: "/patients" },
    { label: "Appointments", path: "/appointments" },
    { label: "Book Appointment", path: "/appointments/book" },
    { label: "Doctor Slots", path: "/slots" },
    { label: "Schedule Generator", path: "/schedule-generator" },
    { label: "Lab Reports", path: "/lab-reports" },
    { label: "Prescriptions", path: "/prescriptions" },
  ];

  const menu = user?.role === "ADMIN" ? adminMenu : doctorMenu;

  async function handleLogout() {
    try {
      if (refreshToken) {
        await logoutUser(axiosPrivate, refreshToken);
      }
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      logout();
      navigate("/login", { replace: true });
    }
  }

  return (
    <aside className="m-4 flex w-72 flex-col rounded-[28px] bg-[#17351f] p-5 text-white shadow-[0_18px_40px_rgba(23,53,31,0.25)]">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          HAPMS
        </h1>
        <p className="mt-1 text-sm text-[#b9c9b6]">
          Healthcare Dashboard
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-[#e8f3df] text-[#17351f]"
                  : "text-[#d7e4d3] hover:bg-white/10 hover:text-white"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;