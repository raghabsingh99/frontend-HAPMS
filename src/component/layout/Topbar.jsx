import { useAuth } from "../../hooks/useAuth";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col gap-4 rounded-[28px] border border-white/10 bg-[#151d35]/90 px-5 py-4 shadow-[0_18px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-semibold tracking-wide text-white">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Welcome back to your hospital management panel
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-w-[280px] items-center rounded-2xl border border-white/8 bg-white/6 px-4 py-3 text-sm text-slate-400">
          Search here...
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/6 px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 text-sm font-bold text-blue-300">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {user?.username || "Guest"}
            </p>
            <p className="text-xs text-slate-400">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;