import { Search } from "lucide-react";

export default function SearchAndFilters({
  sections,
  section,
  onSectionChange,
  query,
  onQueryChange,
  searchScope,
  onSearchScopeChange
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {sections.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => onSectionChange(name)}
              className={`rounded-xl border px-3 py-2 text-sm ${
                section === name
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="搜索公司、代码、保荐人、结构、行业"
              className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-400 sm:w-80"
            />
          </div>
          <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 text-xs">
            <button
              type="button"
              onClick={() => onSearchScopeChange("current")}
              className={`rounded-lg px-3 py-1.5 ${
                searchScope === "current" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              当前日报
            </button>
            <button
              type="button"
              onClick={() => onSearchScopeChange("all")}
              className={`rounded-lg px-3 py-1.5 ${
                searchScope === "all" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500"
              }`}
            >
              历史搜索
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}