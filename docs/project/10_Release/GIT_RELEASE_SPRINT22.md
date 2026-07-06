# Git Release - Sprint 22

## TradePilot Pro

Release: Sprint 22
Branch: develop

---

# 1. Check Current State

Run from the project root:

```bash
git status
```

Review every changed file before staging.

---

# 2. Recommended Verification Before Commit

Backend:

```bash
cd backend
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
http://127.0.0.1:8000/portfolio/summary
http://127.0.0.1:8000/portfolio/overview
```

Frontend:

```bash
cd frontend
npm run dev
```

Verify:

- Dashboard loads.
- PortfolioWidget displays 8 metrics.
- No console errors.
- Loading/error/empty states still work.

---

# 3. Stage Files

From project root:

```bash
git add backend/app/routers/portfolio.py
git add backend/app/services/portfolio_service.py
git add backend/app/schemas/portfolio.py
git add frontend/src/services/portfolioService.js
git add frontend/src/components/widgets
git add frontend/src/components/dashboard/portfolio
git add frontend/src/features/portfolio
git add docs
```

Or, if you reviewed all changes carefully:

```bash
git add .
```

---

# 4. Commit

```bash
git commit -m "Sprint 22 - Complete Portfolio Feature Module and Widget Infrastructure v3"
```

---

# 5. Push

```bash
git push origin develop
```

---

# 6. Optional Tag

Use one of these formats.

Simple sprint tag:

```bash
git tag sprint-22
git push origin sprint-22
```

Version-style tag:

```bash
git tag v0.22.0-sprint22
git push origin v0.22.0-sprint22
```

---

# 7. If Remote Is Missing

If `git remote -v` shows no origin:

```bash
git remote add origin https://github.com/bpanagioths-afk/TradePilot-Pro.git
git push -u origin develop
```

---

# 8. Sprint 22 Done Message

After successful push:

```text
Sprint 22 completed and pushed.
Ready for Sprint 23 - Portfolio Analytics Dashboard.
```
