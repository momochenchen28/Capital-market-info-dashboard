# Capital Market Info Dashboard

资本市场日报 Dashboard 的 React/Vite 原型。

## 当前范围

- 静态日报数据，不接自动抓取。
- 页面数据来自 `public/data.json`，部署后访问路径是 `/data.json`。
- 港交所 AP 与 PHIP 分开展示。
- 顶部 metrics 必须和公司明细数量一致。
- 无新增事件统一显示“该类别当日暂无新增事件”。

## 本地运行

```bash
npm install
npm run dev
```
打开终端提示的本地地址，通常是 http://localhost:5173。

## 本地检查
```bash
npm run lint
npm run build
```
npm run lint 当前执行数据一致性检查，重点校验 AP/PHIP metrics 与明细数量是否匹配。

## Vercel 部署
把本仓库推送到 GitHub。
打开 Vercel，选择 Add New Project。
导入这个 GitHub 仓库。
Framework Preset 选择 Vite。
Build Command 使用 npm run build。
Output Directory 使用 dist。
点击 Deploy。
public/data.json 会被 Vite 原样复制到部署根路径，因此页面会通过 /data.json 读取数据。

vercel.json 已配置单页应用回退，刷新页面或直接打开子路径时不会 404。

## 每日更新 data.json 的最简单流程
打开 public/data.json。
新增或修改对应日期下的日报数据。
如果更新 AP/PHIP 数字，必须同时更新 apApplications 明细。
运行 npm run lint，确认 AP/PHIP metrics 与明细数量一致。
提交并推送到 GitHub。
Vercel 会自动重新部署。