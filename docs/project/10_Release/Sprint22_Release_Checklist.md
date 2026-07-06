# Sprint 22 Release Checklist

## TradePilot Pro

Release: Sprint 22
Status: Release checklist
Date: 2026-07-06

---

# 1. Code Verification

## Backend

- [ ] Backend starts successfully.
- [ ] FastAPI Swagger opens at `/docs`.
- [ ] `GET /portfolio/summary` works.
- [ ] `GET /portfolio/overview` works.
- [ ] Portfolio router remains thin.
- [ ] Portfolio business logic remains in service layer.
- [ ] No database migration required unless local schema differs.

## Frontend

- [ ] Frontend starts successfully.
- [ ] Dashboard loads without console errors.
- [ ] PortfolioWidget loads from `/portfolio/overview`.
- [ ] Portfolio metrics render correctly.
- [ ] Widget loading/error/empty states still work.
- [ ] No duplicate metric layout code remains in Portfolio metrics components.

---

# 2. Sprint 22 Feature Checklist

- [x] Modular Portfolio API created.
- [x] `/portfolio/overview` added.
- [x] `/portfolio/summary` preserved.
- [x] Portfolio statistics added.
- [x] Portfolio allocation foundation added.
- [x] Portfolio performance foundation added.
- [x] Portfolio Feature Module created.
- [x] `usePortfolio()` hook created.
- [x] Portfolio metric components extracted.
- [x] WidgetMetricGrid created.
- [x] WidgetMetrics created.
- [x] Routing/navigation audit completed.
- [x] Portfolio page/sidebar integration postponed intentionally.

---

# 3. Documentation Checklist

- [x] Package A prepared.
- [x] Package B prepared.
- [x] Package C prepared.
- [x] Package D prepared.
- [x] Sprint 23 handoff prompt prepared.
- [x] Decisions updated.
- [x] Component Library updated.
- [x] Design System updated.
- [x] Source Code Structure updated.
- [x] Current Project Status updated.

---

# 4. Manual Verification Commands

Run from project root:

```bash
git status
```

Backend:

```bash
cd backend
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm run dev
```

Useful URLs:

```text
http://127.0.0.1:8000/docs
http://127.0.0.1:8000/portfolio/summary
http://127.0.0.1:8000/portfolio/overview
```

---

# 5. Git Release Checklist

- [ ] Review changed files.
- [ ] Confirm no `.env`, `venv`, `node_modules`, uploads or generated cache files are staged.
- [ ] Stage code and docs.
- [ ] Commit Sprint 22.
- [ ] Push to remote.
- [ ] Create tag if desired.
- [ ] Push tag if created.

---

# 6. Sprint 22 Close Condition

Sprint 22 is complete only after:

```text
Code complete
↓
Documentation complete
↓
Verification complete
↓
Git commit complete
↓
Sprint 23 handoff ready
```
