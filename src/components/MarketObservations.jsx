import { AlertCircle } from "lucide-react";

export default function MarketObservations({ observations }) {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {observations.map((observation) => (
        <div
          key={observation}
          className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm"
        >
          <AlertCircle className="mb-2 h-4 w-4 text-slate-500" />
          {observation}
        </div>
      ))}
    </section>
  );
}