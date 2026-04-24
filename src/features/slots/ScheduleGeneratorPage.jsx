import { useState } from "react";
import PageHeader from "../../component/common/PageHeader";
import Card from "../../component/ui/Card";
import { useAxiosPrivate } from "../../hooks/useAxiosPrivate";
import { generateWeeklySlots } from "./api";
import WeeklyScheduleForm from "./components/WeeklyScheduleForm";


function ScheduleGeneratorPage() {
  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  async function handleGenerateSchedule(formData) {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const data = await generateWeeklySlots(axiosPrivate, formData);
      setResult(data);
    } catch (err) {
      console.error("Failed to generate weekly schedule:", err);
      setError("Failed to generate weekly schedule.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule Generator"
        subtitle="Generate weekly doctor slots in bulk"
      />

      {error ? (
        <Card>
          <p className="text-red-300">{error}</p>
        </Card>
      ) : null}

      {result ? (
        <Card>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-white">
              Schedule Generated Successfully
            </h3>
            <p className="text-slate-300">
              Created Slots:{" "}
              <span className="font-bold text-emerald-300">
                {result.createdSlots ?? 0}
              </span>
            </p>
          </div>
        </Card>
      ) : null}

      <WeeklyScheduleForm onSubmit={handleGenerateSchedule} loading={loading} />
    </div>
  );
}

export default ScheduleGeneratorPage;