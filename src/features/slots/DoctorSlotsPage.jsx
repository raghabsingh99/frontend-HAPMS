import { useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { createSlot, getAvailableSlots } from "../../features/slots/api";
import SlotForm from "./components/SlotForm";
import SlotTable from "./components/SlotTable";

function DoctorSlotsPage() {
  const axiosPrivate = useAxiosPrivate();

  const [doctorId, setDoctorId] = useState("");
  const [slots, setSlots] = useState([]);
  const [creating, setCreating] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");

  async function handleCreateSlot(formData) {
    try {
      setCreating(true);
      setError("");

      await createSlot(axiosPrivate, formData);

      if (doctorId && Number(doctorId) === formData.doctorId) {
        const data = await getAvailableSlots(axiosPrivate, doctorId);
        setSlots(data);
      }
    } catch (err) {
      console.error("Failed to create slot:", err);
      setError("Failed to create slot.");
    } finally {
      setCreating(false);
    }
  }

  async function handleLoadSlots() {
    if (!doctorId) {
      setError("Please enter a doctor ID to load slots.");
      return;
    }

    try {
      setLoadingSlots(true);
      setError("");

      const data = await getAvailableSlots(axiosPrivate, doctorId);
      setSlots(data);
    } catch (err) {
      console.error("Failed to load slots:", err);
      setError("Failed to load available slots.");
    } finally {
      setLoadingSlots(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Doctor Slots"
        subtitle="Create and view available doctor slots"
      />

      {error ? (
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      <SlotForm onSubmit={handleCreateSlot} loading={creating} />

      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Load Available Slots</h3>
          <p className="mt-1 text-sm text-slate-400">
            Enter a doctor ID to view current available slots
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="w-full md:max-w-xs">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Doctor ID
            </label>
            <input
              type="number"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="Enter doctor ID"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
            />
          </div>

          <button
            type="button"
            onClick={handleLoadSlots}
            disabled={loadingSlots}
            className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loadingSlots ? "Loading..." : "Load Slots"}
          </button>
        </div>
      </Card>

      <SlotTable slots={slots} />
    </div>
  );
}

export default DoctorSlotsPage;