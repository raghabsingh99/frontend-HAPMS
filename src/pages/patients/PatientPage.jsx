import { useEffect, useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import { getPatients, createPatient } from "../../features/patients/api";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import PatientTable from "../../features/patients/PatientTable";
import PatientForm from "../../component/PatientForm";

function PatientsPage() {
  const axiosPrivate = useAxiosPrivate();

  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);


  async function fetchPatients() {
    try {
      setLoading(true);
      setError("");

      const data = await getPatients(axiosPrivate);
      setPatients(data);
    } catch (err) {
      console.error("Failed to load patients:", err);
      setError("Failed to load patients data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, [axiosPrivate]);

   async function handleCreatePatient(formData) {
    try {
      setCreating(true);
      setError("");

      await createPatient(axiosPrivate, formData);

      setShowForm(false);
      await fetchPatients();
    } catch (err) {
      console.error("Failed to create patient:", err);
      setError("Failed to create patient.");
    } finally {
      setCreating(false);
    }
  }


  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Patients"
          subtitle="Manage hospital patient records"
        />
        <Card>
          <p className="text-slate-300">Loading patients...</p>
        </Card>
      </div>
    );
  }

   return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <PageHeader
          title="Patients"
          subtitle="Manage hospital patient records"
        />

        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95"
        >
          {showForm ? "Close Form" : "Add Patient"}
        </button>
      </div>

      {error ? (
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      {showForm ? (
        <PatientForm
          onSubmit={handleCreatePatient}
          loading={creating}
          onCancel={() => setShowForm(false)}
        />
      ) : null}

      <PatientTable patients={patients} />
    </div>
  );
}

export default PatientsPage;