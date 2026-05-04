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

  const inputClass =
    "w-full rounded-2xl border border-[#e7e2d6] bg-[#fbfaf6] px-4 py-3 text-[#1f2933] outline-none transition placeholder:text-[#9ca3af] focus:border-[#2f6b3f]";

  async function handleLoadSlots() {
    setSelectedSlotId("");
    await onLoadSlots(doctorId);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await onBook({
      patientId: Number(patientId),
      slotId: Number(selectedSlotId),
    });

    setPatientId("");
    setDoctorId("");
    setSelectedSlotId("");
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-bold text-[#1f2933]">Book Appointment</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Select a patient, load doctor slots, and confirm booking
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
              Patient ID
            </label>
            <input
              type="number"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#374151]">
              Doctor ID
            </label>
            <input
              type="number"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="Enter doctor ID"
              className={inputClass}
              required
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleLoadSlots}
              disabled={!doctorId || loadingSlots}
              className="w-full rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingSlots ? "Loading Slots..." : "Load Slots"}
            </button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="mb-5">
          <h3 className="text-lg font-bold text-[#1f2933]">Available Slots</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Choose one available slot for the appointment
          </p>
        </div>

        {slots.length === 0 ? (
          <p className="text-sm text-[#6b7280]">
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
                        ? "border-[#2f6b3f] bg-[#e8f3df]"
                        : "border-[#e7e2d6] bg-[#fbfaf6] hover:bg-[#f5f3ec]"
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

                    <p className="text-sm font-bold text-[#1f2933]">
                      Slot #{slot.id}
                    </p>
                    <p className="mt-2 text-sm text-[#374151]">
                      Start: {formatDateTime(slot.startTime)}
                    </p>
                    <p className="text-sm text-[#374151]">
                      End: {formatDateTime(slot.endTime)}
                    </p>
                    <span className="mt-3 inline-block rounded-full bg-[#e8f3df] px-3 py-1 text-xs font-semibold text-[#2f6b3f]">
                      {slot.status}
                    </span>
                  </label>
                );
              })}
            </div>

            <button
              type="submit"
              disabled={!patientId || !selectedSlotId || booking}
              className="rounded-2xl bg-[#17351f] px-5 py-3 font-semibold text-white shadow-[0_8px_20px_rgba(23,53,31,0.18)] transition hover:bg-[#224b2c] disabled:cursor-not-allowed disabled:opacity-60"
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