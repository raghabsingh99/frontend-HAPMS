import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";

import {
  getPatientById,
  getPatientAllergies,
  addPatientAllergy,
  getPatientHistory,
  addPatientHistory,
} from "../../features/patients/api";

function PatientDetailPage() {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

  const [patient, setPatient] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [history, setHistory] = useState([]);
  const [allergyName, setAllergyName] = useState("");
  const [historyForm, setHistoryForm] = useState({
    entryDate: "",
    diagnosis: "",
    notes: "",
  });

  const [loading, setLoading] = useState(true);
  const [savingAllergy, setSavingAllergy] = useState(false);
  const [savingHistory, setSavingHistory] = useState(false);
  const [error, setError] = useState("");

  async function loadPatientData() {
    try {
      setLoading(true);
      setError("");

      const [patientData, allergyData, historyData] = await Promise.all([
        getPatientById(axiosPrivate, id),
        getPatientAllergies(axiosPrivate, id),
        getPatientHistory(axiosPrivate, id),
      ]);

      setPatient(patientData);
      setAllergies(allergyData);
      setHistory(historyData);
    } catch (err) {
      console.error("Failed to load patient detail:", err);
      setError("Failed to load patient details.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPatientData();
  }, [id, axiosPrivate]);

  async function handleAddAllergy(e) {
    e.preventDefault();

    if (!allergyName.trim()) return;

    try {
      setSavingAllergy(true);
      setError("");

      await addPatientAllergy(axiosPrivate, id, allergyName);
      setAllergyName("");

      const data = await getPatientAllergies(axiosPrivate, id);
      setAllergies(data);
    } catch (err) {
      console.error("Failed to add allergy:", err);
      setError("Failed to add allergy.");
    } finally {
      setSavingAllergy(false);
    }
  }

  async function handleAddHistory(e) {
    e.preventDefault();

    try {
      setSavingHistory(true);
      setError("");

      await addPatientHistory(axiosPrivate, id, {
        entryDate: historyForm.entryDate || null,
        diagnosis: historyForm.diagnosis,
        notes: historyForm.notes,
      });

      setHistoryForm({
        entryDate: "",
        diagnosis: "",
        notes: "",
      });

      const data = await getPatientHistory(axiosPrivate, id);
      setHistory(data);
    } catch (err) {
      console.error("Failed to add history:", err);
      setError("Failed to add medical history.");
    } finally {
      setSavingHistory(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Patient Details" subtitle="Loading patient record..." />
        <Card>
          <p className="text-slate-300">Loading...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={patient?.name || "Patient Details"}
        subtitle="View patient profile, allergies, and medical history"
      />

      {error ? (
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-white">Basic Information</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Info label="Patient ID" value={patient?.id} />
          <Info label="Name" value={patient?.name} />
          <Info label="Age" value={patient?.age} />
          <Info label="Email" value={patient?.email || "-"} />
          <Info label="Phone" value={patient?.phone || "-"} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <h3 className="mb-4 text-lg font-semibold text-white">Allergies</h3>

          <form onSubmit={handleAddAllergy} className="mb-5 flex gap-3">
            <input
              value={allergyName}
              onChange={(e) => setAllergyName(e.target.value)}
              placeholder="Enter allergy name"
              className="flex-1 rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/60"
            />
            <button
              disabled={savingAllergy}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              {savingAllergy ? "Adding..." : "Add"}
            </button>
          </form>

          {allergies.length === 0 ? (
            <p className="text-sm text-slate-400">No allergies found.</p>
          ) : (
            <div className="space-y-2">
              {allergies.map((allergy) => (
                <div
                  key={allergy.id}
                  className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-300"
                >
                  {allergy.name}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-white">Add Medical History</h3>

          <form onSubmit={handleAddHistory} className="space-y-4">
            <input
              type="date"
              value={historyForm.entryDate}
              onChange={(e) =>
                setHistoryForm((prev) => ({ ...prev, entryDate: e.target.value }))
              }
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none focus:border-blue-400/60"
            />

            <input
              value={historyForm.diagnosis}
              onChange={(e) =>
                setHistoryForm((prev) => ({ ...prev, diagnosis: e.target.value }))
              }
              placeholder="Diagnosis"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/60"
              required
            />

            <textarea
              value={historyForm.notes}
              onChange={(e) =>
                setHistoryForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Notes"
              rows="3"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-blue-400/60"
            />

            <button
              disabled={savingHistory}
              className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              {savingHistory ? "Saving..." : "Save History"}
            </button>
          </form>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-white">Medical History</h3>

        {history.length === 0 ? (
          <p className="text-sm text-slate-400">No medical history found.</p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4"
              >
                <p className="text-sm text-slate-400">
                  Date: {item.entryDate || "-"}
                </p>
                <p className="mt-1 font-semibold text-white">
                  {item.diagnosis}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {item.notes || "-"}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value ?? "-"}</p>
    </div>
  );
}

export default PatientDetailPage;