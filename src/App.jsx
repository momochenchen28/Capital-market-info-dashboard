import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle } from "lucide-react";
import DealCard from "./components/DealCard.jsx";
import EmptyState from "./components/EmptyState.jsx";
import Header from "./components/Header.jsx";
import MarketObservations from "./components/MarketObservations.jsx";
import MetricCards from "./components/MetricCards.jsx";
import SearchAndFilters from "./components/SearchAndFilters.jsx";
import { DEFAULT_EMPTY_EVENT_TEXT, DEFAULT_SECTIONS, validateReports } from "./dashboardData.js";
import { buildCounts, isNoNewEvent, itemSearchText } from "./utils/dashboard.js";

const DATA_URL =
  "https://raw.githubusercontent.com/momochenchen28/Capital-market-info-dashboard/main/public/data.json";
const DATA_UPDATES_URL =
  "https://raw.githubusercontent.com/momochenchen28/Capital-market-info-dashboard/main/public/data-updates.json";
const DATED_UPDATES_INDEX_URL =
  "https://raw.githubusercontent.com/momochenchen28/Capital-market-info-dashboard/main/public/updates/index.json";
const DATED_UPDATES_BASE_URL =
  "https://raw.githubusercontent.com/momochenchen28/Capital-market-info-dashboard/main/public/updates";

function mergeDealUpdates(baseDeals = [], updateDeals = [], removeDealIds = []) {
  const removeSet = new Set(removeDealIds);
  const merged = baseDeals.filter((deal) => !removeSet.has(deal.id));

  updateDeals.forEach((deal) => {
    const existingIndex = merged.findIndex((item) => item.id === deal.id);
    if (existingIndex >= 0) {
      merged[existingIndex] = { ...merged[existingIndex], ...deal };
      return;
    }
    merged.push(deal);
  });

  return merged;
}

function mergeDashboardData(baseData, updates) {
  if (!updates) return baseData;

  const merged = {
    ...baseData,
    generatedAt: updates.generatedAt || baseData.generatedAt,
    linkMap: { ...(baseData.linkMap || {}), ...(updates.linkMap || {}) },
    dailyReports: { ...(baseData.dailyReports || {}) }
  };

  Object.entries(updates.dailyReports || {}).forEach(([date, reportUpdate]) => {
    const currentReport = merged.dailyReports[date] || { date, deals: [] };
    merged.dailyReports[date] = {
      ...currentReport,
      ...reportUpdate,
      deals: mergeDealUpdates(
        currentReport.deals,
        reportUpdate.deals,
        reportUpdate.removeDealIds
      )
    };
    delete merged.dailyReports[date].removeDealIds;
  });

  return merged;
}

async function fetchJsonIfAvailable(url) {
  const response = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`数据更新文件加载失败：${response.status}`);
  return response.json();
}

async function fetchDatedUpdates() {
  const index = await fetchJsonIfAvailable(DATED_UPDATES_INDEX_URL);
  if (!index?.files?.length) return [];

  return Promise.all(
    index.files.map((file) => fetchJsonIfAvailable(`${DATED_UPDATES_BASE_URL}/${file}`))
  );
}

export default function CapitalMarketsDailyDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [section, setSection] = useState("全部");
  const [query, setQuery] = useState("");
  const [searchScope, setSearchScope] = useState("current");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadDashboardData = useCallback(async ({ keepSelectedDate = false } = {}) => {
    setIsRefreshing(true);
    setLoadError("");

    try {
      const response = await fetch(`${DATA_URL}?t=${Date.now()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`data.json 加载失败：${response.status}`);

      const baseData = await response.json();
      const legacyUpdates = await fetchJsonIfAvailable(DATA_UPDATES_URL);
      const datedUpdates = await fetchDatedUpdates();
      const data = [legacyUpdates, ...datedUpdates].reduce(
        (currentData, updates) => mergeDashboardData(currentData, updates),
        baseData
      );
      const dates = Object.keys(data.dailyReports || {}).sort().reverse();

      setDashboardData(data);
      setSelectedDate((currentDate) => {
        if (keepSelectedDate && dates.includes(currentDate)) return currentDate;
        return dates[0] || "";
      });
    } catch (error) {
      setLoadError(error.message);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadDashboardData();
  }, [loadDashboardData]);

  const emptyEventText = dashboardData?.emptyEventText || DEFAULT_EMPTY_EVENT_TEXT;
  const sections = dashboardData?.sections || DEFAULT_SECTIONS;
  const dailyReports = dashboardData?.dailyReports || {};
  const linkMap = dashboardData?.linkMap || {};
  const reportDates = useMemo(() => Object.keys(dailyReports).sort().reverse(), [dailyReports]);
  const validationErrors = useMemo(
    () => validateReports(dailyReports, emptyEventText),
    [dailyReports, emptyEventText]
  );

  const activeReport = selectedDate ? dailyReports[selectedDate] : null;
  const deals = activeReport?.deals || [];

  const allDeals = useMemo(
    () =>
      Object.values(dailyReports).flatMap((report) =>
        (report.deals || []).map((deal) => ({
          ...deal,
          reportDate: report.date,
          reportTitle: report.title
        }))
      ),
    [dailyReports]
  );

  const sourceDeals = searchScope === "all" && query.trim() ? allDeals : deals;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sourceDeals.filter((item) => {
      if (section !== "全部" && item.section !== section) return false;
      if (section !== "全部" && isNoNewEvent(item, emptyEventText)) return false;
      if (searchScope === "all" && q && isNoNewEvent(item, emptyEventText)) return false;
      return !q || itemSearchText(item).includes(q);
    });
  }, [section, query, sourceDeals, searchScope, emptyEventText]);

  const counts = useMemo(() => buildCounts(deals, emptyEventText), [deals, emptyEventText]);

  if (loadError && !dashboardData) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {loadError}
        </div>
      </div>
    );
  }

  if (!activeReport) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 text-slate-600">
          正在读取日报数据...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <Header
          activeReport={activeReport}
          reportDates={reportDates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          onRefreshData={() => loadDashboardData({ keepSelectedDate: true })}
          isRefreshing={isRefreshing}
        />

        {loadError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            数据刷新失败：{loadError}
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="mr-2 inline h-4 w-4" />
            数据一致性检查发现 {validationErrors.length} 个问题，请先修复后再更新日报。
          </div>
        )}

        <MetricCards counts={counts} section={section} onSectionChange={setSection} />

        <SearchAndFilters
          sections={sections}
          section={section}
          onSectionChange={setSection}
          query={query}
          onQueryChange={setQuery}
          searchScope={searchScope}
          onSearchScopeChange={setSearchScope}
        />

        <MarketObservations observations={activeReport.observations} />

        <section className="space-y-4">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((item) => (
              <DealCard
                key={`${item.reportDate || selectedDate}-${item.id}`}
                item={item}
                emptyEventText={emptyEventText}
                linkMap={linkMap}
              />
            ))
          )}
        </section>
      </div>
    </div>
  );
}
