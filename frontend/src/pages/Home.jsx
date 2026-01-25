function Home() {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem",
    padding: "2rem",
    background: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const descriptionStyle = {
    fontSize: "1.1rem",
    color: "#555",
    maxWidth: "900px",
    margin: "1.5rem auto",
    lineHeight: "1.8",
    textAlign: "left",
  };

  const sectionStyle = {
    marginTop: "2rem",
    padding: "2rem",
    background: "white",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const techStackStyle = {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    marginTop: "1.5rem",
  };

  const badgeStyle = {
    background: "#5a9f7e",
    color: "white",
    padding: "0.5rem 1.2rem",
    borderRadius: "5px",
    fontSize: "0.9rem",
  };

  const logoContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    marginBottom: "2rem",
    padding: "2rem",
    flexWrap: "wrap",
  };

  const logoStyle = {
    height: "120px",
    width: "auto",
    objectFit: "contain",
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img src="/spel-logo.png" alt="SPEL Lab Logo" style={logoStyle} />
        <img src="/iitgn-logo.png" alt="IIT Gandhinagar Logo" style={logoStyle} />
      </div>
      
      <div style={headerStyle}>
        <h1>VidyutAI - AI Center of Excellence</h1>
        <h2 style={{fontSize: "1.5rem", color: "#5a9f7e", marginTop: "1rem"}}>Green Energy Transition Dashboard</h2>
      </div>

      <div style={sectionStyle}>
        <h2>About the Project</h2>
        <p style={descriptionStyle}>
          IIT Gandhinagar is leading AI Center of Excellence on Sustainability for Green Energy Transition: VidyutAI. 
          Under this project student will develop a state-of-art dashboard for enabling renewable energy integration, 
          carbon emissions, cost-benefit analysis with data driven automated operation.
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>Key Features</h2>
        <ul style={{marginTop: "1rem", lineHeight: "2", color: "#555"}}>
          <li>Renewable Energy Integration Analysis</li>
          <li>Carbon Emissions Tracking & Monitoring</li>
          <li>Cost-Benefit Analysis Tools</li>
          <li>Data-Driven Automated Operations</li>
          <li>Real-time Dashboard Visualization</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2>Technology Stack</h2>
        <div style={techStackStyle}>
          <span style={badgeStyle}>React</span>
          <span style={badgeStyle}>Node.js</span>
          <span style={badgeStyle}>Express</span>
          <span style={badgeStyle}>MySQL</span>
          <span style={badgeStyle}>AI/ML</span>
        </div>
      </div>
    </div>
  );
}

export default Home;
