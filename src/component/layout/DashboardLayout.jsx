import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#f5f3ec] text-[#1f2933]">
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex-1 px-4 py-4 md:px-6 md:py-5">
          <Topbar />

          <main className="mt-5 rounded-[28px] border border-[#e7e2d6] bg-[#fbfaf6] p-4 shadow-[0_12px_35px_rgba(32,44,35,0.06)] md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;