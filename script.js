:root {
  --green-900: #0f3d2e;
  --green-800: #14532d;
  --green-100: #dcfce7;
  --gold-600: #b45309;
  --gold-500: #d97706;
  --gold-400: #f59e0b;
  --gold-100: #fef3c7;

  --bg: #f8fafc;
  --bg-alt: #f1f5f9;
  --surface: #ffffff;
  --surface-2: #f8fafc;
  --text: #0f172a;
  --muted: #475569;
  --border: #e2e8f0;

  --success: #16a34a;
  --warning: #d97706;
  --danger: #dc2626;

  --radius: 16px;
  --radius-sm: 10px;
  --shadow: 0 12px 32px rgba(15, 23, 42, 0.07);
  --transition: 0.22s ease;
}

[data-theme="dark"] {
  --bg: #09111e;
  --bg-alt: #0f172a;
  --surface: #111c2e;
  --surface-2: #17253b;
  --text: #f1f5f9;
  --muted: #94a3b8;
  --border: #23334d;
  --shadow: 0 14px 36px rgba(0, 0, 0, 0.35);
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: "Inter", sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  overflow-x: hidden;
  transition: background var(--transition), color var(--transition);
}

h1,
h2,
h3,
h4 {
  font-family: "Playfair Display", serif;
  line-height: 1.2;
}

a {
  color: inherit;
  text-decoration: none;
}

code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  background: var(--bg-alt);
  padding: 2px 6px;
  border-radius: 6px;
  font-size: 0.9em;
}

.container {
  width: min(1180px, 92%);
  margin: 0 auto;
}

.section {
  padding: 84px 0;
}

.section-alt {
  background: var(--bg-alt);
}

.section-head {
  max-width: 680px;
  margin-bottom: 40px;
}

.eyebrow {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gold-500);
  margin-bottom: 8px;
}

.muted {
  color: var(--muted);
}

.hidden {
  display: none !important;
}

.mt-1 { margin-top: 6px; }
.mt-2 { margin-top: 10px; }
.mt-3 { margin-top: 14px; }
.mt-4 { margin-top: 20px; }
.mt-6 { margin-top: 28px; }

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  padding: 12px 20px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: transform var(--transition), background var(--transition), opacity var(--transition);
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-sm {
  padding: 8px 14px;
  font-size: 0.85rem;
}

.btn-primary {
  background: var(--gold-500);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--gold-600);
}

.btn-outline {
  background: rgba(255, 255, 255, 0.08);
  color: #ffffff;
  border-color: rgba(255, 255, 255, 0.35);
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.16);
}

.btn-ghost {
  background: var(--surface-2);
  color: var(--text);
  border-color: var(--border);
}

.btn-dark {
  background: var(--green-900);
  color: #ffffff;
}

.btn-success {
  background: var(--success);
  color: #ffffff;
}

.btn-danger {
  background: var(--danger);
  color: #ffffff;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 61, 46, 0.92);
  backdrop-filter: blur(12px);
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 72px;
  gap: 16px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-badge {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: var(--gold-500);
  color: #ffffff;
  font-weight: 800;
  display: grid;
  place-items: center;
}

.brand small {
  display: block;
  font-size: 0.75rem;
  opacity: 0.85;
}

.nav-links {
  display: flex;
  gap: 24px;
  font-weight: 500;
  font-size: 0.95rem;
}

.nav-links a:hover {
  color: var(--gold-400);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.mode-pill {
  font-size: 0.75rem;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(245, 158, 11, 0.2);
  color: var(--gold-400);
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.hamburger {
  display: none;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: #ffffff;
  border-radius: 8px;
  padding: 6px 10px;
  font-size: 1.1rem;
  cursor: pointer;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #0b2e22 0%, #0f3d2e 55%, #14532d 100%);
  color: #ffffff;
  padding: 76px 0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.35fr 0.9fr;
  gap: 36px;
  align-items: center;
}

.hero h1 {
  font-size: clamp(2.3rem, 5vw, 3.6rem);
  margin-bottom: 16px;
}

.hero-copy p {
  color: rgba(255, 255, 255, 0.88);
  max-width: 600px;
  font-size: 1.05rem;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 26px;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
  margin-top: 34px;
}

.stat-box {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 14px;
}

.stat-box strong {
  display: block;
  font-size: 1.35rem;
  color: var(--gold-400);
}

.stat-box span {
  font-size: 0.82rem;
  opacity: 0.85;
}

.hero-card {
  color: var(--text);
}

/* Cards & Grids */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 24px;
  box-shadow: var(--shadow);
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.grid-2-tight {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.program-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--green-100);
  color: var(--green-900);
  margin-bottom: 12px;
}

/* Forms */
.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 14px;
}

.stack-sm {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  font-size: 0.88rem;
  font-weight: 600;
}

input,
select {
  width: 100%;
  padding: 11px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--surface-2);
  color: var(--text);
  font-family: inherit;
  font-size: 0.95rem;
}

input:focus,
select:focus {
  outline: 2px solid var(--gold-500);
  border-color: var(--gold-500);
}

.input-group {
  display: flex;
  gap: 10px;
}

.tracker-box {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 14px;
  font-size: 0.92rem;
}

/* Pills & Badges */
.pill {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

.pill-gold {
  background: var(--gold-100);
  color: var(--gold-600);
}

.pill-green {
  background: var(--green-100);
  color: var(--green-800);
}

.status-badge {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 700;
}

.status-Pending,
.status-Unpaid {
  background: #fef3c7;
  color: #b45309;
}

.status-Approved,
.status-Paid {
  background: #dcfce7;
  color: #15803d;
}

.status-Partial {
  background: #e0f2fe;
  color: #0369a1;
}

/* Tables */
.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

th,
td {
  text-align: left;
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
}

th {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
}

/* Role Cards & Portal Workspace */
.role-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.role-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  text-align: left;
  padding: 22px;
  border-radius: var(--radius);
  background: var(--surface);
  border: 2px solid var(--border);
  color: var(--text);
  cursor: pointer;
  box-shadow: var(--shadow);
  transition: transform var(--transition), border-color var(--transition);
}

.role-card:hover,
.role-card.active {
  transform: translateY(-3px);
  border-color: var(--gold-500);
}

.role-icon {
  font-size: 1.6rem;
}

.role-card strong {
  font-size: 1.05rem;
}

.role-card small {
  color: var(--muted);
}

.portal-topbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--border);
}

.portal-controls {
  display: flex;
  gap: 10px;
}

.login-box {
  max-width: 440px;
  margin: 28px auto 8px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.kpi-card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
}

.kpi-card span {
  font-size: 0.8rem;
  color: var(--muted);
}

.kpi-card strong {
  display: block;
  font-size: 1.6rem;
  margin-top: 6px;
  color: var(--green-900);
}

[data-theme="dark"] .kpi-card strong {
  color: var(--gold-400);
}

.child-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}

/* Footer & Toast */
.footer {
  background: var(--green-900);
  color: #ffffff;
  padding: 36px 0;
}

.footer-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 18px;
}

.toast {
  position: fixed;
  bottom: 22px;
  right: 22px;
  z-index: 999;
  background: var(--green-900);
  color: #ffffff;
  border-left: 4px solid var(--gold-400);
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: var(--shadow);
  opacity: 0;
  transform: translateY(12px);
  pointer-events: none;
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast.show {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 960px) {
  .hero-grid,
  .grid-3,
  .grid-2,
  .role-grid,
  .kpi-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 680px) {
  .nav-links {
    display: none;
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    flex-direction: column;
    background: var(--green-900);
    padding: 18px 6%;
    gap: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  .nav-links.open {
    display: flex;
  }

  .hamburger {
    display: inline-block;
  }

  .mode-pill {
    display: none;
  }

  .hero-grid,
  .grid-3,
  .grid-2,
  .grid-2-tight,
  .role-grid,
  .kpi-grid,
  .hero-stats {
    grid-template-columns: 1fr;
  }

  .input-group {
    flex-direction: column;
  }
}
