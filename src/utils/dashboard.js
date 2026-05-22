export const sectionTheme = {
  港股新挂牌: {
    soft: "bg-sky-50 text-sky-700 border-sky-200",
    card: "border-sky-100 bg-sky-50/45",
    dot: "bg-sky-500"
  },
  "港股递表/聆讯": {
    soft: "bg-emerald-50 text-emerald-700 border-emerald-200",
    card: "border-emerald-100 bg-emerald-50/35",
    dot: "bg-emerald-500"
  },
  证监会备案: {
    soft: "bg-violet-50 text-violet-700 border-violet-200",
    card: "border-violet-100 bg-violet-50/35",
    dot: "bg-violet-500"
  },
  美股中概: {
    soft: "bg-amber-50 text-amber-700 border-amber-200",
    card: "border-amber-100 bg-amber-50/35",
    dot: "bg-amber-500"
  }
};

export const typeBadgeClass = {
  今日新上市: "bg-sky-50 text-sky-700 border-sky-200",
  "AP / PHIP 更新": "bg-emerald-50 text-emerald-700 border-emerald-200",
  境外上市备案: "bg-violet-50 text-violet-700 border-violet-200",
  "SEC 公开递交/上市": "bg-amber-50 text-amber-700 border-amber-200"
};

export const metricCards = [
  { key: "港股新挂牌", label: "港股 IPO 新挂牌", countKey: "ipo" },
  { key: "港股递表/聆讯", label: "港股递表/聆讯更新", countKey: "hkex" },
  { key: "证监会备案", label: "证监会备案新增", countKey: "csrc" },
  { key: "美股中概", label: "美股中概 IPO 事件", countKey: "us" }
];

export function isNoNewEvent(item, emptyEventText) {
  return item.status === emptyEventText;
}

export function sumMetric(deals, metric) {
  return deals.reduce((total, item) => total + (item.metrics?.[metric] || 0), 0);
}

export function itemSearchText(item) {
  return [
    item.company?.display,
    item.company?.zh,
    item.company?.en,
    item.company?.ticker,
    item.company?.exchange,
    item.company?.listingStructure,
    item.type,
    item.business?.summary,
    item.business?.sector,
    item.reportDate,
    item.reportTitle,
    item.intermediaries?.sponsors?.join(" "),
    item.intermediaries?.globalCoordinators?.join(" "),
    item.intermediaries?.bookrunners?.join(" "),
    item.apApplications
      ?.map((app) =>
        [app.nameZh, app.nameEn, app.structure, app.sponsors, app.businessSummary, app.sector].join(" ")
      )
      .join(" "),
    item.csrcKeyIssues?.join(" "),
    item.csrcSupplement?.companies
      ?.map((company) => [company.name, company.likelyMarket, ...(company.coreIssues || [])].join(" "))
      .join(" ")
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function buildCounts(deals, emptyEventText) {
  return {
    ipo: deals.filter(
      (deal) => deal.section === "港股新挂牌" && deal.type === "今日新上市" && !isNoNewEvent(deal, emptyEventText)
    ).length,
    hkex: sumMetric(deals, "apNewCount") + sumMetric(deals, "phipCount"),
    csrc: deals.filter((deal) => deal.section === "证监会备案" && !isNoNewEvent(deal, emptyEventText)).length,
    us: deals.filter((deal) => deal.section === "美股中概" && !isNoNewEvent(deal, emptyEventText)).length
  };
}