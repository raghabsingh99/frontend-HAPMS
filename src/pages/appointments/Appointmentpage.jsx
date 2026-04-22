import { useEffect, useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { searchAppointments } from "../../features/appointments/api";
import AppointmentTable from "../../features/appointments/AppointmentTable";
import AppointmentFilterForm from "../../component/AppointmentFilterForm";

function AppointmentsPage() {
  const axiosPrivate = useAxiosPrivate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchAppointments(payload = {}) {
    try {
      setLoading(true);
      setError("");

      const data = await searchAppointments(axiosPrivate, payload);
      setAppointments(data);
    } catch (err) {
      console.error("Failed to load appointments:", err);
      setError("Failed to load appointments data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAppointments({});
  }, [axiosPrivate]);

  async function handleSearch(filters) {
    await fetchAppointments(filters);
  }

  async function handleReset() {
    await fetchAppointments({});
  }

  if (loading && appointments.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Appointments"
          subtitle="Manage hospital appointment records"
        />
        <Card>
          <p className="text-slate-300">Loading appointments...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        subtitle="Manage hospital appointment records"
      />

      <AppointmentFilterForm
        onSearch={handleSearch}
        onReset={handleReset}
        loading={loading}
      />

      {error ? (
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      <AppointmentTable appointments={appointments} />
    </div>
  );
}

export default AppointmentsPage;
 