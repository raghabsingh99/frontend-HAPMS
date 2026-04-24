import { useState } from "react";
import Card from "../../../component/ui/Card";

function formatDateTime(value) {
  if (!value) return "-";
  return new Date(value).toLocaleString();
}

function BookAppointmentForm({
  slots,
  loadingSlots,
  booking,
  onLoadSlots,
  onBook,
}) {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState("");

  async function handleLoadSlots() {
    setSelectedSlotId("");
    await onLoadSlots(Number(doctorId));
  }

  async function handleSubmit(e) {
  e.preventDefault();

  const selectedSlot = slots.find(
    (slot) => slot.id === Number(selectedSlotId)
  );

  const payload = {
    patientId: Number(patientId),
    doctorId: Number(doctorId),
    slotId: Number(selectedSlotId),
    appointmentDateTime: selectedSlot?.startTime,
  };

  console.log("Form booking payload:", payload);

  await onBook(payload);

  setPatientId("");
  setDoctorId("");
  setSelectedSlotId("");
}

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Book Appointment</h3>
          <p className="mt-1 text-sm text-slate-400">
            Select a patient, load doctor slots, and confirm booking
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Patient ID
            </label>
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Doctor ID
            </label>
            <input
              type="number"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="Enter doctor ID"
              className="w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400/60 focus:bg-white/8"
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleLoadSlots}
              disabled={!doctorId || loadingSlots}
              className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-500 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingSlots ? "Loading Slots..." : "Load Slots"}
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-semibold text-white">Available Slots</h3>
          <p className="mt-1 text-sm text-slate-400">
            Choose one available slot for the appointment
          </p>
        </div>

        {slots.length === 0 ? (
          <p className="text-sm text-slate-400">
            No slots loaded yet. Enter doctor ID and click Load Slots.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {slots.map((slot) => {
                const selected = Number(selectedSlotId) === slot.id;

                return (
                  <label
                    key={slot.id}
                    className={`cursor-pointer rounded-2xl border p-4 transition ${
                      selected
                        ? "border-blue-400/60 bg-blue-500/15"
                        : "border-white/10 bg-white/6 hover:bg-white/10"
                    }`}
                  >
                    <input
                      type="radio"
                      name="slotId"
                      value={slot.id}
                      checked={selected}
                      onChange={(e) => setSelectedSlotId(e.target.value)}
                      className="hidden"
                      required
                    />

                    <p className="text-sm font-semibold text-white">
                      Slot #{slot.id}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Start: {formatDateTime(slot.startTime)}
                    </p>
                    <p className="text-sm text-slate-300">
                      End: {formatDateTime(slot.endTime)}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300">
                      {slot.status}
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={!patientId || !doctorId || !selectedSlotId || booking}
              className="rounded-2xl bg-gradient-to-r from-emerald-600 to-blue-500 px-5 py-3 font-semibold text-white shadow-lg shadow-emerald-900/30 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {booking ? "Booking..." : "Confirm Booking"}
            </button>
          </form>
        )}
      </Card>
    </div>
  );
}

export default BookAppointmentForm;