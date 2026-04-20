import { useAuth } from "../../hooks/useAuth";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-800">
        Hospital Appointment Management System
      </h2>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
          {user?.role || "User"}
        </span>

        <span className="text-sm text-slate-6000">
          {user?.username || "Guest"}
        </span>
      </div>
    </header>
  );
}

export default Topbar;