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

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

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
          <p className="font-medium text-[#374151]">Loading...</p>
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
          <p className="font-medium text-[#dc2626]">{error}</p>
        </Card>
      ) : null}

      <Card>
        <h3 className="mb-4 text-lg font-bold text-[#1f2933]">
          Basic Information
        </h3>

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
          <h3 className="mb-4 text-lg font-bold text-[#1f2933]">Allergies</h3>

          <form onSubmit={handleAddAllergy} className="mb-5 flex gap-3">
            <input
              value={allergyName}
              onChange={(e) => setAllergyName(e.target.value)}
              placeholder="Enter allergy name"
              className={inputClass}
            />
            <button
              disabled={savingAllergy}
              className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingAllergy ? "Adding..." : "Add"}
            </button>
          </form>

          {allergies.length === 0 ? (
            <p className="text-sm text-[#6b7280]">No allergies found.</p>
          ) : (
            <div className="space-y-2">
              {allergies.map((allergy) => (
                <div
                  key={allergy.id}
                  className="rounded-2xl border border-[#e7e2d6] bg-[#f8f6ef] px-4 py-3 text-sm font-medium text-[#374151]"
                >
                  {allergy.name}
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="mb-4 text-lg font-bold text-[#1f2933]">
            Add Medical History
          </h3>

          <form onSubmit={handleAddHistory} className="space-y-4">
            <input
              type="date"
              value={historyForm.entryDate}
              onChange={(e) =>
                setHistoryForm((prev) => ({ ...prev, entryDate: e.target.value }))
              }
              className={inputClass}
            />

            <input
              value={historyForm.diagnosis}
              onChange={(e) =>
                setHistoryForm((prev) => ({ ...prev, diagnosis: e.target.value }))
              }
              placeholder="Diagnosis"
              className={inputClass}
              required
            />

            <textarea
              value={historyForm.notes}
              onChange={(e) =>
                setHistoryForm((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Notes"
              rows="3"
              className={inputClass}
            />

            <button
              disabled={savingHistory}
              className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {savingHistory ? "Saving..." : "Save History"}
            </button>
          </form>
        </Card>
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-bold text-[#1f2933]">
          Medical History
        </h3>

        {history.length === 0 ? (
          <p className="text-sm text-[#6b7280]">No medical history found.</p>
        ) : (
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#e7e2d6] bg-[#f8f6ef] px-4 py-4"
              >
                <p className="text-sm text-[#6b7280]">
                  Date: {item.entryDate || "-"}
                </p>
                <p className="mt-1 font-bold text-[#1f2933]">
                  {item.diagnosis}
                </p>
                <p className="mt-2 text-sm text-[#374151]">
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
    <div className="rounded-2xl border border-[#e7e2d6] bg-[#f8f6ef] px-4 py-3">
      <p className="text-xs font-medium text-[#6b7280]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#1f2933]">{value ?? "-"}</p>
    </div>
  );
}

export default PatientDetailPage;