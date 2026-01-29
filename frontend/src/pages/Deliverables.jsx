function Deliverables() {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem",
  };

  const subtitleStyle = {
    color: "#555",
    fontSize: "1.1rem",
    marginTop: "0.5rem",
  };

  const deliverableStyle = {
    background: "white",
    borderRadius: "8px",
    padding: "2rem",
    marginBottom: "1.5rem",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const labelStyle = {
    background: "#5a9f7e",
    color: "white",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    display: "inline-block",
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const titleStyle = {
    fontSize: "1.3rem",
    color: "#333",
    marginBottom: "1rem",
  };

  const descriptionStyle = {
    color: "#555",
    lineHeight: "1.8",
  };

  const deliverables = [
    {
      label: "A",
      title: "Experimental Data Collection and Industry Technology Review",
      description: "Experimental multiparameter dataset generation for different capacity/manufacturer Li-ion battery packs under various stress conditions to train the proposed ML battery model."
    },
    {
      label: "B",
      title: "Development of Battery Digital Twin (BDT)",
      description: "Physics-guided electro-thermal-aging LIB ML model leveraging electrochemical insights to understand voltage, pressure and thermal runaway onset signatures based on extensive literature review and advanced ML."
    },
    {
      label: "C",
      title: "Development of Multi-modal IoT Interface",
      description: "Temperature, pressure, gas, moisture, voltage detection using optimally distributed cost-effective sensors throughout the battery pack."
    },
    {
      label: "D",
      title: "BDT to IoT Integration",
      description: "Porting of the ML model to IoT MCU and sensor-integration for lab-based testing."
    },
    {
      label: "E",
      title: "Deployment and Testing of Smart Battery Safety Diagnostics System",
      description: "Field-deployable smart battery safety diagnostics system deployment integrating all subsystems achieving self-powered operation, TR alert, and mitigation. This leads to iterative upgrades."
    },
    {
      label: "F",
      title: "Field Performance & Impact Assessment",
      description: "Field-Testing with Industrial Partner for impact assessment."
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Timeline and Deliverables </h1>
        <p style={subtitleStyle}>
          Three-year timeline for Smart Battery Safety Diagnostic System development
        </p>
      </div>
    
      <div style={{marginBottom: "2rem", padding: "1.5rem", background: "#f9f9f9", borderRadius: "8px", border: "1px solid #ddd"}}>
        <h3 style={{color: "#5a9f7e", marginBottom: "1rem"}}>Project Overview</h3>
        <p style={{color: "#555", lineHeight: "1.8"}}>
          We propose a scalable smart battery safety diagnostic system with multi-modal sensing of Li-ion 
          battery pack's parameters, namely gas emission, temperature, pressure, and voltage, with subsequent 
          physics-guided ML-powered signature analysis for early detection of Thermal Runaway (TR).
        </p>
      </div>

      {deliverables.map((item, index) => (
        <div key={index} style={deliverableStyle}>
          <span style={labelStyle}>Phase {item.label}</span>
          <h3 style={titleStyle}>{item.title}</h3>
          <p style={descriptionStyle}>{item.description}</p>
        </div>
      ))}

      <div style={{marginTop: "3rem", padding: "1.5rem", background: "#e8f5e9", borderRadius: "8px", textAlign: "center"}}>
        <p style={{color: "#5a9f7e", fontSize: "1.1rem", fontWeight: "600"}}>
          📌 Current Status: Baseline Development Phase
        </p>
        <p style={{color: "#555", marginTop: "0.5rem"}}>
          This dashboard represents the initial baseline for the MAHA-EV-DASHBOARD project
        </p>
      </div>
    </div>
  );
}

export default Deliverables;
