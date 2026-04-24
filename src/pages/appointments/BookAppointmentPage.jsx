import { useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { getAvailableSlots } from "../../features/slots/api";
import { bookAppointment } from "../../features/appointments/api";
import BookAppointmentForm from "../../features/appointments/components/BookingAppointmentForm";

function BookAppointmentPage() {
  const axiosPrivate = useAxiosPrivate();

  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleLoadSlots(doctorId) {
    try {
      setLoadingSlots(true);
      setError("");
      setSuccess("");

      const data = await getAvailableSlots(axiosPrivate, doctorId);
      setSlots(data);
    } catch (err) {
      console.error("Failed to load slots:", err);
      setError("Failed to load available slots.");
    } finally {
      setLoadingSlots(false);
    }
  }

  async function handleBookAppointment(payload) {
  try {
    setBooking(true);
    setError("");
    setSuccess("");

    const appointment = await bookAppointment(axiosPrivate, payload);

    setSuccess(
      `Appointment booked successfully. Appointment ID: ${appointment.id}`
    );

    setSlots((prev) => prev.filter((slot) => slot.id !== payload.slotId));
  } catch (err) {
  console.error("Failed to book appointment:", err);

  const backendError = err.response?.data;
  console.log("Backend error response:", backendError);
  console.log("Validation messages:", backendError?.messges);

  setError(
    backendError?.messges?.[0] ||
      backendError?.message ||
      backendError?.error ||
      "Failed to book appointment."
  );
  } finally {
    setBooking(false);
  }
}

  return (
    <div className="space-y-6">
      <PageHeader
        title="Book Appointment"
        subtitle="Create a new appointment using available doctor slots"
      />

      {error ? (
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      {success ? (
        <Card>
          <p className="text-emerald-300">{success}</p>
        </Card>
      ) : null}

      <BookAppointmentForm
        slots={slots}
        loadingSlots={loadingSlots}
        booking={booking}
        onLoadSlots={handleLoadSlots}
        onBook={handleBookAppointment}
      />
    </div>
  );
}

export default BookAppointmentPage;