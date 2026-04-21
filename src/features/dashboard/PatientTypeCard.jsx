import Card from "../../component/ui/Card";

function PatientTypeCard() {
  return (
    <Card className="h-full">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-white">Patients Type</h3>
        <p className="mt-1 text-sm text-slate-400">Demographic overview</p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-center">
        <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#a855f7_0_42%,#fb7185_42%_72%,#facc15_72%_100%)] p-4">
          <div className="flex h-full w-full items-center justify-center rounded-full bg-[#151d35]">
            <div className="text-center">
              <p className="text-xs text-slate-400">Total</p>
              <p className="text-2xl font-bold text-white">100%</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="h-3 w-3 rounded-full bg-purple-500" />
            <span>Male</span>
            <span className="ml-auto font-semibold text-white">42%</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="h-3 w-3 rounded-full bg-pink-400" />
            <span>Female</span>
            <span className="ml-auto font-semibold text-white">30%</span>
          </div>

          <div className="flex items-center gap-3 text-sm text-slate-300">
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span>Children</span>
            <span className="ml-auto font-semibold text-white">28%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PatientTypeCard;