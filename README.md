# Apex

JAMB & WAEC exam-preparation app, converted from the Claude Design project "Apex Student Journey Design" into Next.js (App Router) + React.

## Run

```bash
npm install
npm run dev      # http://localhost:8765
npm run build && npm start
```

## Structure

| Path | What it is |
| --- | --- |
| `app/` | Next.js entry: `layout.jsx` (Inter font, metadata), `page.jsx`, `globals.css` |
| `components/ApexApp.jsx` | Client root: wires `useApex()` to the view tree |
| `components/ApexView.jsx` | Picks the current route (landing, auth, onboarding, exam, app) |
| `components/views/` | `Landing`, `Auth`, `Onboarding`, `ExamRoom`, `AppShell` |
| `components/views/screens/` | Dashboard, Practice, Mock exams, Results, Progress, Updates, Profile |
| `components/Icon.jsx` | Lucide icons used by the design, looked up by name |
| `hooks/useApex.js` | State, localStorage persistence (`apex_state_v1`), exam timer |
| `lib/actions.js` | Every state transition (auth, onboarding, practice, mock exams, submit) |
| `lib/viewModel.js` | Builds the flat view-model the screens render from |
| `lib/exam.js`, `lib/data.js` | Scoring and helpers; question bank, subjects, updates |
| `lib/css.js` | Turns the view-model's inline-CSS strings into React style objects |
| `design-source/` | Original `Apex.dc.html` + `support.js` and the one-off converter script |

The question bank is a small sample and the auth is a front-end prototype only (no backend); progress is stored in the browser.
