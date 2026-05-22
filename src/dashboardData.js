export const DEFAULT_EMPTY_EVENT_TEXT = "该类别当日暂无新增事件";
export const DEFAULT_SECTIONS = ["全部", "港股新挂牌", "港股递表/聆讯", "证监会备案", "美股中概"];

export function countApPhip(applications = []) {
  return applications.reduce(
    (counts, app) => {
      if (app.status === "PHIP" || app.documentType?.includes("PHIP")) {
        counts.phipCount += 1;
      } else if (app.status === "NEW AP" || app.documentType?.includes("Application Proof")) {
        counts.apNewCount += 1;
      }
      return counts;
    },
    { apNewCount: 0, phipCount: 0 }
  );
}

export function validateReports(reports, emptyEventText = DEFAULT_EMPTY_EVENT_TEXT) {
  const errors = [];

  for (const [date, report] of Object.entries(reports || {})) {
    for (const deal of report.deals || []) {
      if (deal.metrics) {
        const actual = countApPhip(deal.apApplications);
        if (actual.apNewCount !== deal.metrics.apNewCount || actual.phipCount !== deal.metrics.phipCount) {
          errors.push(
            `${date} ${deal.id}: AP/PHIP metrics (${deal.metrics.apNewCount}/${deal.metrics.phipCount}) do not match details (${actual.apNewCount}/${actual.phipCount}).`
          );
        }
      }

      if (deal.status === emptyEventText && deal.monitorItems?.[0] !== emptyEventText) {
        errors.push(`${date} ${deal.id}: empty state text must be "${emptyEventText}".`);
      }
    }
  }

  return errors;
}