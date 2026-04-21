import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 px-4 py-4 md:px-6 md:py-5">
          <Topbar />

          <main className="mt-5 rounded-3xl border border-white/8 bg-white/5 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;