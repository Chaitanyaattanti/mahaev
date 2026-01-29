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
    margin: "0",
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
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "2rem",
    padding: "2rem",
  };

  const logoStyle = {
    height: "100px",
    width: "auto",
    objectFit: "contain",
    flex: "0 0 auto",
  };

  const iitgnLogoStyle = {
    ...logoStyle,
    mixBlendMode: "multiply",
  };

  const centerContentStyle = {
    flex: "1",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#5a9f7e",
    margin: "0",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    color: "#333",
    margin: "0",
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img src="/spel-logo.png" alt="SPEL Lab Logo" style={logoStyle} />
        
        <div style={centerContentStyle}>
          <h1 style={titleStyle}>MAHA-EV DASHBOARD</h1>
        </div>
        
        <img src="/icon.jpeg" alt="IIT Gandhinagar Logo" style={logoStyle} />
      </div>
      
      <div style={headerStyle}>
        <h2 style={{fontSize: "1.5rem", color: "#5a9f7e", marginTop: "1rem"}}>Smart Battery Safety Diagnostic System</h2>
      </div>

      <div style={sectionStyle}>
        <h2>About the Project</h2>
        <p style={descriptionStyle}>
          IIT Gandhinagar is leading AI Center of Excellence on Sustainability for Green Energy Transition: MAHA-EV-DASHBOARD. 
          This project focuses on developing a scalable smart battery safety diagnostic system with multi-modal sensing 
          of Li-ion battery pack's parameters, namely gas emission, temperature, pressure, and voltage, with subsequent 
          physics-guided ML-powered signature analysis for early detection of Thermal Runaway (TR).
        </p>
      </div>

      <div style={sectionStyle}>
        <h2>Key Focus Areas</h2>
        <ul style={{marginTop: "1rem", lineHeight: "2", color: "#555"}}>
          <li> Li-ion Battery Safety & Thermal Runaway Detection</li>
          <li> Multi-modal Sensing (Temperature, Pressure, Gas, Voltage)</li>
          <li> Physics-Guided Machine Learning Models</li>
          <li> IoT-MCU Integration for Real-time Monitoring</li>
          <li> Field-Deployable Smart Diagnostic System</li>
        </ul>
      </div>


    </div>
  );
}

export default Home;
