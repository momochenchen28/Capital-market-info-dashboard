# Capital Markets Dashboard Project Spec

## 1. Project Overview

This project is a daily capital markets dashboard focused on:

1. Hong Kong IPO market
2. HKEX Application Proof / PHIP updates
3. CSRC overseas listing filings
4. US-listed Chinese IPOs / SEC filings

The dashboard should function as:
- a daily IPO intelligence monitor
- a searchable historical archive
- a semi-automated market data reporting system

The project is designed for future migration into:
- GitHub
- Codex
- Vercel deployment
- automatic data refresh workflow

---

# 2. Core Dashboard Sections

## A. 港股 IPO 新挂牌 (HK IPO New Listings)

Track newly listed HKEX IPO companies.

Each company should include:

### Basic Information
- Chinese name
- English name
- ticker
- exchange
- board
- listing structure
  - H share
  - A+H
  - Red-chip
  - VIE
  - overseas operating company / non-China operating issuer
  - pending verification

### Listing Structure Classification Rules

Listing structure must be judged from the prospectus, Application Proof, PHIP, company structure chart, history and reorganization section, and relationship between the listing issuer and the main operating entities.

Use the following hierarchy:

1. H股
   - The listing issuer is incorporated in mainland China.
   - The issuer is usually a PRC joint stock limited company.
   - The issuer directly issues H shares in Hong Kong.

2. A+H
   - The listing issuer is incorporated in mainland China.
   - The company is already listed on an A-share exchange and is applying for or completing an H-share listing.
   - Use A+H instead of plain H股 when the A-share listing is confirmed.

3. 红筹
   - The listing issuer is incorporated outside mainland China.
   - The issuer controls the main PRC operating entities through direct or indirect equity ownership.
   - No VIE contractual control is required for the core operating entities.

4. VIE
   - The listing issuer is incorporated outside mainland China.
   - The core PRC operating entities are controlled through contractual arrangements rather than direct or indirect equity ownership.
   - Trigger words include VIE, contractual arrangements, structured contracts, WFOE control agreements, exclusive business cooperation agreement, equity pledge agreement, voting rights proxy, or similar control contracts.

5. Overseas operating company / non-China operating issuer
   - The listing issuer is incorporated outside mainland China.
   - The main operating assets and entities are not primarily PRC domestic operating entities.
   - Do not force these companies into Red-chip or VIE.

6. Pending verification
   - If the structure chart, history and reorganization section, or domestic operating entity relationship has not been reviewed, mark as pending verification.
   - Do not over-infer from company name alone.

For every non-obvious structure judgment, preserve a short basis in the data or notes, such as:
- issuer incorporation place
- main operating entity
- equity-control basis
- VIE-contract basis
- A-share listing status

### Business Information
- business summary
- sector

### IPO Information
- offer price
- shares offered
- fundraising amount
- market cap at listing
- public offer oversubscription
- international offer oversubscription
- clawback situation
- cornerstone investors

### Market Performance
- open price
- open change %
- first day close
- latest price
- latest price change %

### Timeline
- first filing date
- refiling date(s)
- hearing date
- prospectus date
- allotment result date
- listing date
- CSRC filing acceptance date
- CSRC filing approval date

### Intermediaries
- sponsors
- sponsor overall coordinators
- overall coordinators
- global coordinators
- bookrunners
- lead managers
- auditors
- issuer counsel
- underwriter counsel
- compliance advisor
- industry consultant

### Links
- prospectus
- allotment results
- PHIP
- HKEX listing page

---

## B. 港股递表 / 聆讯 (HKEX AP / PHIP)

Track:
- Application Proof
- PHIP
- updated OC/AP filings

IMPORTANT:
- AP and PHIP MUST be displayed separately
- counts must match detailed company entries

### Mandatory HKEX AP / PHIP Verification Policy

Do not rely on general web search, search snippets, or HKEX page visual inspection alone to conclude that there are no AP / PHIP updates.

The authoritative first-pass source for AP / PHIP daily checks is HKEX's structured JSON under:
- `https://www1.hkexnews.hk/ncms/json/eds/appactive_app_sehk_e.json`
- `https://www1.hkexnews.hk/ncms/json/eds/appactive_appphip_sehk_e.json`
- Chinese equivalents may be used for Chinese names:
  - `appactive_app_sehk_c.json`
  - `appactive_appphip_sehk_c.json`

Daily AP / PHIP workflow:
1. Fetch the structured HKEX AP-only JSON.
2. Fetch the structured HKEX AP+PHIP JSON.
3. Filter each applicant's document list by the target date.
4. Count only actual `Application Proof` entries as AP.
5. Count only actual `PHIP` / `Post Hearing Information Pack` entries as PHIP.
6. Do not count OC announcements alone as a new AP unless the same applicant/date also has an Application Proof entry.
7. De-duplicate the same applicant when both OC appointment and Application Proof appear on the same day.
8. Reconcile metrics with `apApplications` detail rows before committing.
9. If AP/PHIP is reported as zero, explicitly state that the structured HKEX JSON source was checked.

Failure mode to avoid:
- On 2026-05-26, general search missed two same-day AP filings because HKEX's newest AP entries were present in structured JSON but not surfaced reliably by search snippets. This caused AP to be incorrectly reported as 0 before correction. Future updates must use the JSON verification workflow first.

Each AP / PHIP company should include:
- Chinese name
- English name
- filing date
- document type
- listing structure
- structure judgment basis when non-obvious
- sponsors
- sector
- business summary
- prospectus/AP/PHIP link

---

## C. 中国证监会备案 (CSRC Filing)

Track:
- overseas listing filing approvals
- supplementary material requests
- filing acceptance notices

Each filing should include:
- company info
- target market
- listing structure
- filing notice number
- filing timeline
- core regulatory issues

Listing structure determination rules:
- structure classification must NOT be over-inferred
- if uncertain:
  - mark confidence level
  - specify source basis
- SEC/F-1 structure disclosure preferred for US listings

Supplementary material disclosure should include:
- company-level issues
- grouped by company
- clearly summarize regulatory focus areas

---

## D. 美股中概 IPO (US-listed Chinese IPOs)

Track:
- F-1
- F-1/A
- EFFECT
- 8-A
- pricing
- listing

Sources:
- SEC EDGAR
- Nasdaq
- NYSE

Include:
- company intro
- structure
- filing stage
- target exchange
- timeline
- links

---

# 3. Search Rules

Dashboard must support:

## Current Report Search
Search only current selected date.

## Historical Search
Search across ALL archived reports.

Searchable fields:
- Chinese name
- English name
- ticker
- sponsors
- structure
- sector
- business summary
- intermediaries
- AP/PHIP content
- CSRC issues

---

# 4. Empty-State Rules

If a section has no new events:

DO NOT display empty tables.

Instead display:

"该类别当日暂无新增事件"

And preserve:
- official source links

---

# 5. UI / Presentation Rules

## Section Color Themes

港股新挂牌:
- blue

港股递表/聆讯:
- green

证监会备案:
- purple

美股中概:
- amber

## AP / PHIP Display Rules

Top:
- summary metrics

Below:
- detailed company cards

NEW AP:
- green label

PHIP:
- blue label

---

# 6. Data Consistency Rules

IMPORTANT:

Metrics and detailed company entries MUST always match.

Forbidden:
- updating only top metrics
- missing company detail updates

If AP count changes:
- company detail section MUST also update

---

# 7. Historical Archive Rules

Historical reports should remain queryable.

Current implementation:
- dailyReports object

Future implementation:
- data.json
- database/API

---

# 8. Future Technical Migration Plan

Current:
- single App.jsx prototype

Planned:
- React components
- external data.json
- automated fetch scripts
- GitHub Actions
- Vercel deployment

---

# 9. Planned Automation

Future scripts:

- fetchHkexListings.js
- fetchHkexApPhip.js
- fetchCsrc.js
- fetchSecChinaIpo.js

Workflow:
1. fetch raw data
2. normalize schema
3. update data.json
4. trigger deployment

---

# 10. Official Data Sources

HKEX:
https://www.hkex.com.hk/

HKEX AP/PHIP:
https://www1.hkexnews.hk/app/appindex.html

HKEX AP/PHIP structured JSON:
https://www1.hkexnews.hk/ncms/json/eds/appactive_app_sehk_e.json
https://www1.hkexnews.hk/ncms/json/eds/appactive_appphip_sehk_e.json

CSRC:
https://www.csrc.gov.cn/

SEC EDGAR:
https://www.sec.gov/search-filings

Nasdaq:
https://www.nasdaq.com/

NYSE:
https://www.nyse.com/

---

# 11. Codex Instructions

When modifying the project:

1. Preserve existing UI
2. Preserve schema compatibility
3. Never silently remove fields
4. Do not over-infer company structure
5. Classify listing structure using prospectus/company-structure evidence, not company name alone
6. Mark confirmed A-share listed companies seeking H-share listing as A+H
7. AP / PHIP must remain separated
8. Metrics must match details
9. Empty sections should use unified wording
10. Historical search must remain functional
11. For AP / PHIP checks, always query HKEX structured JSON before declaring zero updates
12. When AP / PHIP is zero, mention that the structured JSON source was checked
13. Do not use general search results as the sole basis for AP / PHIP no-new-event conclusions

Priority order:
1. correctness
2. data completeness
3. schema consistency
4. UI aesthetics
