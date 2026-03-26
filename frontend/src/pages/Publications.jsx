function Publications() {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const categoryStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    border: "2px solid #e2e8f0",
  };

  const comingSoonStyle = {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    border: "2px dashed #52525b",
    borderRadius: "8px",
    padding: "1.5rem",
    textAlign: "center",
    marginTop: "1rem",
  };

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#1e293b", marginBottom: "1rem" }}>
          Outputs & Publications
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.2rem" }}>
          Research contributions and achievements
        </p>
      </div>

      <div style={categoryStyle}>
        <h3 style={{ fontSize: "1.8rem", color: "#1e293b", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Conference Proceedings
        </h3>
        
        <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1rem", borderLeft: "4px solid #334155", position: "relative" }}>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)", color: "#1e293b", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.75rem" }}>
            Best Paper Award
          </div>
          <p style={{ color: "#1e293b", fontSize: "1rem", lineHeight: "1.8", margin: 0 }}>
            <strong>1.</strong> Y.N. Desai, S. Ghosh and P. Bharadwaj, "Predicting Mechanically Induced Thermal Runaway Severity in Multi-Chemistry Lithium-Ion Cells Using LightGBM for Battery Safety Applications," <em>2025 IEEE 12th National Power Electronics Conference (NPEC)</em>, Calicut, India, Dec. 2025.
          </p>
        </div>
      </div>

      <div style={categoryStyle}>
        <h3 style={{ fontSize: "1.8rem", color: "#1e293b", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Journal Publications
        </h3>
        
        <div style={{ background: "#f8fafc", borderRadius: "8px", padding: "1.5rem", marginBottom: "1rem", borderLeft: "4px solid #334155" }}>
          <p style={{ color: "#1e293b", fontSize: "1rem", lineHeight: "1.8", margin: 0 }}>
            <strong>1.</strong> S. S. Sinha, B. Lehman and P. Bharadwaj, "Life Extension of Lithium-Ion Battery: Degradation Comprehension, Modeling, Characterization, and Mitigation Strategies," in <em>IEEE Open Journal of Power Electronics</em>, vol. 7, pp. 1-27, 2026.
          </p>
        </div>
      </div>

      <div style={categoryStyle}>
        <h3 style={{ fontSize: "1.8rem", color: "#1e293b", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          Patent Applications
        </h3>
        <div style={comingSoonStyle}>
          <p style={{ fontSize: "1.2rem", color: "#92400e", fontWeight: "700", margin: 0 }}>
            Coming Soon
          </p>
          <p style={{ color: "#78350f", marginTop: "0.5rem" }}>
            Patent filings under development
          </p>
        </div>
      </div>

      <div style={{ background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)", borderRadius: "12px", padding: "2rem", marginTop: "2rem", border: "2px solid #374151" }}>
        <h3 style={{ fontSize: "1.5rem", color: "#5b21b6", marginBottom: "1rem" }}>
          Datasets Published
        </h3>
        <p style={{ color: "#6b21a8", fontSize: "1.1rem", lineHeight: "1.8" }}>
          Multiple battery safety datasets are available on our Datasets page. 
          Each dataset includes comprehensive thermal, electrical, and safety parameters 
          collected under various operating conditions.
        </p>
      </div>
    </div>
  );
}

export default Publications;
