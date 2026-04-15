import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { API_URL } from "../config";

// ── Gauge (SVG semi-circle) ─────────────────────────────────────────────────
function Gauge({ score, color }) {
  const r = 80, cx = 100, cy = 100;
  const arc = Math.PI * r;           // π × 80 ≈ 251.3
  const dashOffset = arc - (score / 100) * arc;

  return (
    <svg viewBox="0 0 200 110" style={{ width: "clamp(140px, 60vw, 240px)", display: "block", margin: "0 auto", overflow: "visible" }}>
      {/* Track */}
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none" stroke="#e2e8f0" strokeWidth="15" strokeLinecap="round"
      />
      {/* Fill */}
      <path
        d={`M ${cx - r},${cy} A ${r},${r} 0 0,1 ${cx + r},${cy}`}
        fill="none" stroke={color} strokeWidth="15" strokeLinecap="round"
        strokeDasharray={arc} strokeDashoffset={dashOffset}
        style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.4,0,0.2,1)" }}
      />
      {/* Score number */}
      <text x={cx} y={cy - 14} textAnchor="middle" fontSize="36" fontWeight="800" fill={color}>
        {score}
      </text>
      {/* Label */}
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#94a3b8" letterSpacing="1.5">
        HEALTH SCORE
      </text>
    </svg>
  );
}

// ── Score breakdown bar ─────────────────────────────────────────────────────
function ScoreBar({ label, score, weight }) {
  const color = score >= 75 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div style={{ marginBottom: "clamp(0.8rem, 2vw, 1.1rem)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(0.25rem, 0.5vw, 0.35rem)" }}>
        <span style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)", fontWeight: "600", color: "#374151" }}>
          {label}
          <span style={{ color: "#94a3b8", fontWeight: "400", marginLeft: "0.5rem", fontSize: "clamp(0.7rem, 1vw, 0.78rem)" }}>({weight})</span>
        </span>
        <span style={{ fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)", fontWeight: "700", color, minWidth: "50px", textAlign: "right" }}>{score}/100</span>
      </div>
      <div style={{ background: "#f1f5f9", borderRadius: "99px", height: "7px", overflow: "hidden" }}>
        <div style={{
          width: `${score}%`, height: "100%", background: color,
          borderRadius: "99px", transition: "width 1.3s cubic-bezier(0.4,0,0.2,1)",
        }} />
      </div>
    </div>
  );
}

// ── Slider with live value badge ────────────────────────────────────────────
function SliderInput({ label, value, min, max, step, unit, onChange, hint }) {
  return (
    <div style={{ marginBottom: "clamp(1rem, 2.5vw, 1.6rem)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(0.3rem, 1vw, 0.45rem)" }}>
        <label style={{ fontWeight: "600", fontSize: "clamp(0.8rem, 1.5vw, 0.875rem)", color: "#374151" }}>{label}</label>
        <span style={{
          fontWeight: "700", fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", color: "#1e293b",
          background: "#f1f5f9", padding: "0.15rem clamp(0.5rem, 1vw, 0.75rem)", borderRadius: "99px",
          minWidth: "64px", textAlign: "center",
        }}>
          {value}{unit}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer", height: "4px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "clamp(0.15rem, 0.5vw, 0.25rem)" }}>
        <span style={{ fontSize: "clamp(0.65rem, 1vw, 0.72rem)", color: "#94a3b8" }}>{min}{unit}</span>
        <span style={{ fontSize: "clamp(0.65rem, 1vw, 0.72rem)", color: "#64748b", fontStyle: "italic" }}>{hint}</span>
        <span style={{ fontSize: "clamp(0.65rem, 1vw, 0.72rem)", color: "#94a3b8" }}>{max}{unit}</span>
      </div>
    </div>
  );
}

// ── Main page ───────────────────────────────────────────────────────────────
const DEFAULT = { voltage: 3.7, temperature: 25, cycle_count: 0, soc: 60, c_rate: 1.0 };

export default function BatteryPredictor() {
  const location = useLocation();
  const [form, setForm] = useState(DEFAULT);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check for URL parameters from chatbot
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const updates = {};
    
    if (params.get('voltage')) updates.voltage = parseFloat(params.get('voltage'));
    if (params.get('temperature')) updates.temperature = parseFloat(params.get('temperature'));
    if (params.get('cycle_count')) updates.cycle_count = parseInt(params.get('cycle_count'));
    if (params.get('soc')) updates.soc = parseFloat(params.get('soc'));
    
    if (Object.keys(updates).length > 0) {
      setForm(f => ({ ...f, ...updates }));
    }
  }, [location.search]);

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handlePredict = async () => {
    setLoading(true);
    setError(null);
    try {
      const resp = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) throw new Error("Server error");
      setResult(await resp.json());
    } catch {
      setError("Could not reach the prediction server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Styles ──
  const pageStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    padding: "clamp(1rem, 3vw, 2.5rem) clamp(0.75rem, 2.5vw, 1.75rem)",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "clamp(0.875rem, 2.5vw, 1.5rem)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
    border: "1px solid #e2e8f0",
  };

  const btnStyle = (disabled) => ({
    width: "100%",
    padding: "clamp(0.75rem, 2vw, 0.9rem)",
    borderRadius: "8px",
    background: disabled ? "#94a3b8" : "#3b82f6",
    color: "white",
    border: "none",
    fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
    fontWeight: "700",
    cursor: disabled ? "not-allowed" : "pointer",
    marginTop: "clamp(0.4rem, 1vw, 0.5rem)",
    letterSpacing: "0.3px",
    transition: "background 0.2s",
  });

  return (
    <div style={pageStyle}>
      <div style={{ maxWidth: "1140px", margin: "0 auto" }}>

        {/* ── Header ── */}
        <div style={{ textAlign: "center", marginBottom: "clamp(1.25rem, 3vw, 2.5rem)" }}>
          <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.3rem)", fontWeight: "800", color: "#1e293b", margin: "0 0 0.75rem" }}>
            Battery Health Predictor
          </h1>
          <p style={{ color: "#64748b", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", maxWidth: "620px", margin: "0 auto", lineHeight: "1.6" }}>
            Enter your Li-ion EV battery's operating parameters to receive an instant health rating and personalised recommendations - powered by our RandomForest model.
          </p>
        </div>

        <div style={{ 
          display: "grid", 
          gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr", 
          gap: "clamp(0.75rem, 2vw, 1.75rem)", 
          alignItems: "start" 
        }}>

          {/* ── Left: inputs ── */}
          <div style={cardStyle}>
            <h2 style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", fontWeight: "700", color: "#1e293b", marginTop: 0, marginBottom: "clamp(0.75rem, 1.5vw, 1.25rem)" }}>
              Battery Parameters
            </h2>

            <SliderInput
              label="Current Resting Voltage"
              value={form.voltage} min={2.5} max={4.5} step={0.01} unit=" V"
              onChange={set("voltage")} hint="Li-ion range: 2.5–4.25 V"
            />
            <SliderInput
              label="Operating Temperature"
              value={form.temperature} min={-20} max={80} step={1} unit="°C"
              onChange={set("temperature")} hint="Optimal: 15–35 °C"
            />
            <SliderInput
              label="Charge–Discharge Cycle Count"
              value={form.cycle_count} min={0} max={3000} step={10} unit=" cycles"
              onChange={set("cycle_count")} hint="~EOL at ~1000 cycles"
            />
            <SliderInput
              label="State of Charge (SOC)"
              value={form.soc} min={0} max={100} step={1} unit="%"
              onChange={set("soc")} hint="Best storage: 40–60%"
            />
            <SliderInput
              label="Discharge C-rate"
              value={form.c_rate} min={0.1} max={5} step={0.1} unit=" C"
              onChange={set("c_rate")} hint="Lower = gentler on cells"
            />

            <button onClick={handlePredict} disabled={loading} style={btnStyle(loading)}>
              {loading ? "Analysing…" : "Predict Battery Health"}
            </button>

            {error && (
              <p style={{ color: "#ef4444", fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)", marginTop: "clamp(0.5rem, 1vw, 0.75rem)", textAlign: "center" }}>{error}</p>
            )}
          </div>

          {/* ── Right: results ── */}
          <div>
            {!result ? (
              <div style={{ ...cardStyle, textAlign: "center", padding: "clamp(1.5rem, 3vw, 3rem) clamp(0.75rem, 1.5vw, 1.5rem)" }}>
                <p style={{ color: "#94a3b8", fontSize: "clamp(0.9rem, 1.5vw, 1rem)", lineHeight: "1.6" }}>
                  Configure your battery parameters on the left and click&nbsp;
                  <strong style={{ color: "#3b82f6" }}>Predict Battery Health</strong> to see the analysis.
                </p>
              </div>
            ) : (
              <>
                {/* ── Health Score card ── */}
                <div style={{ ...cardStyle, textAlign: "center", marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>
                  <Gauge score={result.overall} color={result.color} />

                  <div style={{
                    display: "inline-block", marginTop: "clamp(0.75rem, 2vw, 1.1rem)",
                    padding: "clamp(0.35rem, 1vw, 0.45rem) clamp(1rem, 2vw, 1.6rem)", borderRadius: "99px",
                    background: result.color + "1a",
                    color: result.color, fontWeight: "700", fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  }}>
                    Grade {result.grade} &mdash; {result.status}
                  </div>

                  <p style={{ color: "#64748b", fontSize: "clamp(0.8rem, 1.2vw, 0.85rem)", marginTop: "clamp(0.5rem, 1vw, 0.7rem)", marginBottom: 0 }}>
                    Estimated capacity retention:&nbsp;
                    <strong style={{ color: "#1e293b" }}>{result.capacity_retention_pct}%</strong>
                    &nbsp;of rated
                  </p>
                </div>

                {/* ── Breakdown bars ── */}
                <div style={{ ...cardStyle, marginBottom: "clamp(1rem, 2vw, 1.5rem)" }}>
                  <h3 style={{ fontSize: "clamp(0.95rem, 1.8vw, 1rem)", fontWeight: "700", color: "#1e293b", marginTop: 0, marginBottom: "clamp(0.9rem, 2vw, 1.25rem)" }}>
                    Score Breakdown
                  </h3>
                  <ScoreBar label="Capacity Retention"  score={result.breakdown.capacity}    weight="35%" />
                  <ScoreBar label="Voltage Health"       score={result.breakdown.voltage}     weight="25%" />
                  <ScoreBar label="Thermal Condition"    score={result.breakdown.temperature} weight="20%" />
                  <ScoreBar label="SOC Balance"          score={result.breakdown.soc}         weight="10%" />
                  <ScoreBar label="C-rate Stress"        score={result.breakdown.c_rate}      weight="10%" />
                </div>

                {/* ── Recommendations ── */}
                <div style={cardStyle}>
                  <h3 style={{ fontSize: "clamp(0.95rem, 1.8vw, 1rem)", fontWeight: "700", color: "#1e293b", marginTop: 0, marginBottom: "clamp(0.75rem, 1.5vw, 1rem)" }}>
                    Recommendations
                  </h3>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {result.recommendations.map((rec, i) => (
                      <li key={i} style={{
                        padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 1.5vw, 1rem)",
                        background: "#f8fafc",
                        borderRadius: "8px",
                        marginBottom: "clamp(0.4rem, 1vw, 0.6rem)",
                        fontSize: "clamp(0.8rem, 1.2vw, 0.875rem)",
                        color: "#374151",
                        borderLeft: "3px solid #3b82f6",
                        lineHeight: "1.55",
                      }}>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ── Disclaimer ── */}
        <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "clamp(0.7rem, 1.2vw, 0.78rem)", marginTop: "clamp(1.5rem, 3vw, 2.5rem)" }}>
          Scores are produced by a RandomForest model (R²=0.93) trained on CALCE cycle-degradation data, capturing real capacity-fade behaviour across hundreds of charge–discharge sessions.
          Results are indicative — always validate with laboratory measurements before safety-critical decisions.
        </p>
      </div>
    </div>
  );
}
