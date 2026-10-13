import { useState } from "react";
import "./App.css";

const SERVICES = [
  "General Service",
  "Payments",
  "Document Collection",
];

export default function App() {
  const [tokens, setTokens] = useState([]);
  const [service, setService] = useState(SERVICES[0]);
  const [nextNumber, setNextNumber] = useState(1);
  const [lastCalled, setLastCalled] = useState(null);
  const [countersOpen, setCountersOpen] = useState(true);

  const waiting = tokens.filter((token) => token.status === "waiting");
  const served = tokens.filter((token) => token.status === "served");
  const estimatedWait = countersOpen ? waiting.length * 3 : null;

  function takeToken(event) {
    event.preventDefault();

    const newToken = {
      id: nextNumber,
      number: nextNumber,
      service,
      status: "waiting",
    };

    setTokens((currentTokens) => [...currentTokens, newToken]);
    setNextNumber((currentNumber) => currentNumber + 1);
  }

  function callNextToken() {
    if (!countersOpen || waiting.length === 0) return;

    const nextToken = waiting[0];

    setTokens((currentTokens) =>
      currentTokens.map((token) =>
        token.id === nextToken.id
          ? { ...token, status: "served" }
          : token
      )
    );

    setLastCalled(nextToken);
  }

  function resetQueue() {
    setTokens([]);
    setNextNumber(1);
    setLastCalled(null);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="/" aria-label="QueueWise home">
          <span className="brand-mark">Q</span>
          <span>QueueWise</span>
        </a>

        <span className="demo-badge">DEMO MODE</span>
      </header>

      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">PUBLIC SERVICE QUEUE</p>
          <h1>
            Less waiting.
            <br />
            More knowing.
          </h1>
          <p className="hero-copy">
            Take a digital token, follow your place in line, and make your wait
            more predictable.
          </p>
        </div>

        <div className="service-status">
          <span
            className={`status-dot ${countersOpen ? "" : "is-paused"}`}
            aria-hidden="true"
          />
          <div>
            <strong>{countersOpen ? "Counters open" : "Counters paused"}</strong>
            <span>
              Service is {countersOpen ? "available" : "temporarily paused"}
            </span>
          </div>
        </div>
      </section>

      <section className="stats-grid" aria-label="Queue statistics">
        <article className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            ⏳
          </span>
          <span className="stat-label">People waiting</span>
          <strong className="stat-value">{waiting.length}</strong>
        </article>

        <article className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            ◷
          </span>
          <span className="stat-label">Estimated wait</span>
          <strong className="stat-value">
            {estimatedWait === null ? "Paused" : `${estimatedWait} min`}
          </strong>
        </article>

        <article className="stat-card">
          <span className="stat-icon" aria-hidden="true">
            ✓
          </span>
          <span className="stat-label">Served today
