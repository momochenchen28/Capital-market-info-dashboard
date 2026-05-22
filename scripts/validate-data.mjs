import { readFile } from "node:fs/promises";
import { validateReports } from "../src/dashboardData.js";

const rawData = await readFile(new URL("../public/data.json", import.meta.url), "utf8");
const dashboardData = JSON.parse(rawData);
const errors = validateReports(dashboardData.dailyReports, dashboardData.emptyEventText);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Data consistency check passed.");