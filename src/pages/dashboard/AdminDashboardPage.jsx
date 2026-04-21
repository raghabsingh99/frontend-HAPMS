import { useEffect, useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import StatCard from "../../features/dashboard/StatCard";
import ReportChartCard from "../../features/dashboard/ReportChartCard";
import ActivityTableCard from "../../features/dashboard/ActivityTableCard";
import PatientTypeCard from "../../features/dashboard/PatientTypeCard";
import Card from "../../component/ui/Card";
import { getDashboardStats } from "../../features/dashboard/api";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

function AdminDashboardPage() {
  const axiosPrivate = useAxiosPrivate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError("");

        const data = await getDashboardStats(axiosPrivate);
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load dashboard stats:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [axiosPrivate]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Admin Dashboard"
          subtitle="Loading hospital performance overview..."
        />
        <Card>
          <p className="text-slate-300">Loading dashboard data...</p>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Admin Dashboard"
          subtitle="Hospital performance, reports, and activity overview"
        />
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Hospital performance, reports, and activity overview"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Appointments Today"
          value={dashboardData?.appointmentToday ?? 0}
          subtitle="Today's scheduled visits"
          accentClass="bg-emerald-500/15 text-emerald-300"
        />
        <StatCard
          title="Total Patients"
          value={dashboardData?.totalPatients ?? 0}
          subtitle="Registered patient records"
          accentClass="bg-pink-500/15 text-pink-300"
        />
        <StatCard
          title="Booked"
          value={dashboardData?.bookCount ?? 0}
          subtitle="Currently booked appointments"
          accentClass="bg-amber-500/15 text-amber-300"
        />
        <StatCard
          title="Doctors"
          value={dashboardData?.totalDoctor ?? 0}
          subtitle="Available doctors in system"
          accentClass="bg-sky-500/15 text-sky-300"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Top Doctors</h3>
              <span className="rounded-xl border border-white/8 bg-white/6 px-3 py-1 text-xs text-slate-300">
                Top 5
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {dashboardData?.topDoctor?.length ? (
                dashboardData.topDoctor.map((doctor, index) => (
                  <div
                    key={`${doctor.doctorName}-${index}`}
                    className="rounded-2xl border border-white/6 bg-white/4 px-4 py-3"
                  >
                    <p className="text-sm text-slate-400">Doctor</p>
                    <p className="mt-1 text-base font-semibold text-white">
                      {doctor.doctorName}
                    </p>
                    <p className="mt-2 text-sm text-blue-300">
                      Appointments: {doctor.appointment}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No top doctor data available.
                </p>
              )}
            </div>
          </Card>
        </div>

        <div className="xl:col-span-8">
          <ReportChartCard />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <ActivityTableCard />
        </div>

        <div className="xl:col-span-4">
          <PatientTypeCard />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;