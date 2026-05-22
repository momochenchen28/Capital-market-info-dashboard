import SourceLinks from "./SourceLinks.jsx";

export default function EmptyState({ children = "未找到匹配结果。", showSources = true }) {
  return (
    <div>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
        {children}
      </div>
      {showSources && <SourceLinks title="未找到匹配结果，可前往官方信息源复核" />}
    </div>
  );
}