# InForce ROI Calculator - MVP

**Client:** InForce Technologies
**Project:** Productivity Value Gap ROI Calculator
**Built By:** Chase Aldridge (with Moe)
**Date:** November 2025

---

## Overview

Interactive ROI calculator demonstrating cost savings from InForce's 95% retention rate vs. industry-standard turnover.

Based on whitepaper: **"The Need to Turnaround Turnover"** by Mirko Kovacevic (VP of Customer Success, InForce)

---

## Tech Stack

- **HTML5** - Semantic structure
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Alpine.js** - Reactive calculator logic (lightweight)
- **Chart.js** - Productivity curve visualization
- **Static hosting** - Deployable anywhere (VPS, Netlify, Vercel, GHL)

---

## Calculator Methodology

### Productivity Value Gap (PVG) Framework

Based on Mirko's whitepaper 3-component model:

1. **Idle Time** (Vacancy Period)
   - Duration: 2 weeks
   - Payment: 100% of hourly rate
   - Productivity: 0%

2. **Onboarding Lag** (Onboarding Deadtime)
   - Duration: 5 days
   - Payment: 100% of hourly rate
   - Productivity: 0%

3. **Acclimation Period** (Ramp-Up)
   - Duration: 30-60 days (varies by experience level)
   - Payment: 100% of hourly rate
   - Productivity: Partial (ramping from 0% → 100%)

4. **Expertise Gap** (Optional - 4th component)
   - Only if senior replaced by junior
   - Sustained productivity penalty
   - ⚠️ Pending Rick/Mirko validation

### User Inputs

1. **Average Hourly Rate** ($150-$350, default $200)
2. **Team Size** (5-30 people, default 12)
3. **Project Duration** (6-36 months, default 18)
4. **Experience Level** (Junior/Mixed/Senior, default Mixed)

### Static Assumptions

- **InForce Turnover:** 5% annually (95% retention - whitepaper validated)
- **Competitor Turnover:** 30% annually ⚠️ (requires Rick validation)
- **Vacancy Payment:** 100% (whitepaper validated, page 4)
- **Onboarding Duration:** 5 days (subset of whitepaper's 3-week total)

---

## Project Structure

```
calculator-mvp/
├── index.html          # Main calculator page
├── css/
│   └── custom.css      # Custom styles (minimal, Tailwind does most)
├── js/
│   ├── calculator.js   # Core calculation logic
│   └── chart.js        # Productivity curve visualization
├── assets/
│   └── images/         # Logos, graphics (to be added)
├── README.md           # This file
└── .gitignore          # Git ignore file
```

---

## Development

### Local Development

Simply open `index.html` in a browser - no build process needed!

### Deployment Options

1. **Chase's VPS** (nginx static site) - for demo to Rick
2. **GitHub Pages** - free hosting
3. **Netlify/Vercel** - one-click deploy
4. **GoHighLevel** - embed or rebuild natively

---

## Validation Status

### ✅ Whitepaper Validated
- Idle Time: 2 weeks
- Payment during gaps: 100%
- InForce retention: 95%
- PVG 3-component framework

### ⚠️ Requires Rick/Mirko Validation
- Competitor 30% turnover assumption
- Ramp-up timelines by experience level
- Expertise Gap component (4th addition)
- InForce project data for citations

---

## Example Calculation

**Inputs:**
- Hourly Rate: $200
- Team Size: 12
- Project Duration: 18 months
- Experience Level: Mixed

**Competitor (30% turnover):**
- 5 turnover events
- Cost: $332,000

**InForce (5% turnover):**
- 1 turnover event
- Cost: $66,400

**Savings: $265,600** (3.66% of project budget)

---

## Scientific Rigor

Every assumption is either:
- ✅ **Whitepaper-validated** (cited with page numbers)
- ⚠️ **Pending validation** (flagged for Rick/Mirko call)
- 📚 **Industry research** (cited with sources)

**Goal:** "Undeniably true" calculator (Chase's DOE/chemistry background applied)

---

## Next Steps

1. ⏳ Validation call with Rick + Mirko
2. ⏳ Adjust assumptions based on feedback
3. ⏳ Get InForce brand assets (logo, colors, fonts)
4. ⏳ Add real project data if available
5. ⏳ Deploy demo to VPS for Rick to test
6. ⏳ Iterate based on Rick's feedback
7. ⏳ Production build (GHL or standalone)

---

## Contact

**Developer:** Chase Aldridge
**Project Lead:** Moe (WorkFlowClick)
**Client Contact:** Rick Riley (InForce Technologies)

---

## License

Proprietary - Built for InForce Technologies
