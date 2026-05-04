import { useAuth } from "../../hooks/useAuth";

function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col gap-4 rounded-[24px] border border-[#e7e2d6] bg-white px-5 py-4 shadow-[0_10px_28px_rgba(32,44,35,0.07)] lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-wide text-[#1f2933]">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-[#6b7280]">
          Welcome back to your healthcare management panel
        </p>
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-w-[280px] items-center rounded-2xl border border-[#e7e2d6] bg-[#f5f3ec] px-4 py-3 text-sm text-[#6b7280]">
          Search here...
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-[#e7e2d6] bg-[#f5f3ec] px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfeeda] text-sm font-bold text-[#17351f]">
            {user?.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-sm font-bold text-[#1f2933]">
              {user?.username || "Guest"}
            </p>
            <p className="text-xs font-medium text-[#6b7280]">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;