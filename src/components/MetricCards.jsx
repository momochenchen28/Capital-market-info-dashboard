import { metricCards, sectionTheme } from "../utils/dashboard.js";

export default function MetricCards({ counts, section, onSectionChange }) {
  return (
    <section className="grid gap-4 md:grid-cols-4">
      {metricCards.map((metric) => (
        <button
          key={metric.key}
          type="button"
          onClick={() => onSectionChange(metric.key)}
          className={`rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 ${
            section === metric.key
              ? "border-slate-900 bg-white"
              : sectionTheme[metric.key]?.card || "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">{metric.label}</span>
            <span className={`h-2.5 w-2.5 rounded-full ${sectionTheme[metric.key]?.dot}`} />
          </div>
          <div className="mt-3 text-3xl font-semibold">{counts[metric.countKey]}</div>
        </button>
      ))}
    </section>
  );
}