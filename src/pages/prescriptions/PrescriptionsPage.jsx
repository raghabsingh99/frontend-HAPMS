import { useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { createPrescription } from "../../features/prescriptions/api";
import PrescriptionForm from "../../features/prescriptions/components/PrescriptionsForm";

function PrescriptionsPage() {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleCreatePrescription(formData) {
  try {
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      appointmentId: formData.appointmentId
        ? Number(formData.appointmentId)
        : null,
      notes: formData.notes?.trim(),
      medications: formData.medications?.trim(),
    };

    console.log("Prescription payload:", payload);

    const data = await createPrescription(axiosPrivate, payload);

    setSuccess(`Prescription created successfully. Prescription ID: ${data.id}`);
  }  catch (err) {
  console.error("Failed to create prescription:", err);
  console.log("Backend error body:", err.response?.data);

  setError(
    err.response?.data?.message ||
      "Failed to create prescription."
  );
} finally {
    setLoading(false);
  }
}
  return (
    <div className="space-y-6">
      <PageHeader
        title="Prescriptions"
        subtitle="Create prescriptions for completed appointments"
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

      <PrescriptionForm onSubmit={handleCreatePrescription} loading={loading} />
    </div>
  );
}

export default PrescriptionsPage;