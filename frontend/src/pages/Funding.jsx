function Funding() {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const fundingGridStyle = {
    display: "flex",
    gap: "2rem",
    justifyContent: "center",
    alignItems: "stretch",
    flexWrap: "wrap",
    marginTop: "3rem",
  };

  const fundingCardStyle = {
    background: "white",
    borderRadius: "16px",
    padding: "3rem 2rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    border: "2px solid #e2e8f0",
    textAlign: "center",
    flex: "1",
    minWidth: "300px",
    maxWidth: "500px",
  };

  const logoImageStyle = (height) => ({
    height: height,
    width: "auto",
    maxWidth: "100%",
    margin: "0 auto 1.5rem",
    display: "block",
    objectFit: "contain",
  });

  return (
    <div style={containerStyle}>
      <div style={{ textAlign: "center", marginBottom: "4rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#1e293b", marginBottom: "1rem" }}>
          Funding Agencies
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.2rem" }}>
          Supporting the future of battery safety research
        </p>
      </div>

      <div style={fundingGridStyle}>
        <div style={fundingCardStyle}>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, #52525b 0%, #71717a 100%)", color: "white", padding: "0.5rem 1.5rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            PRIMARY FUNDING
          </div>
          <img src="/mahaev/ANRF.png" alt="ANRF Logo" style={logoImageStyle("180px")} />
          <h3 style={{ fontSize: "2rem", color: "#1e293b", fontWeight: "800", marginBottom: "1rem" }}>
            Anusandhan National Research Foundation
          </h3>
        </div>

        <div style={fundingCardStyle}>
          <div style={{ display: "inline-block", background: "#64748b", color: "white", padding: "0.5rem 1.5rem", borderRadius: "20px", fontSize: "0.9rem", fontWeight: "700", marginBottom: "1.5rem" }}>
            INDUSTRY PARTNER
          </div>
          <img src="/mahaev/enphase.png" alt="Enphase Energy Logo" style={logoImageStyle("140px")} />
          <h3 style={{ fontSize: "1.8rem", color: "#1e293b", fontWeight: "700", marginBottom: "1rem" }}>
            Enphase Energy
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Funding;
