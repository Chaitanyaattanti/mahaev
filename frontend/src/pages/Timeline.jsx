import { useState, useEffect } from "react";

function Timeline() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerStyle = {
    padding: "clamp(1.25rem, 2vw, 2.5rem) clamp(0.75rem, 1.5vw, 1.75rem)",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "4rem",
  };

  const timelineContainerStyle = {
    position: "relative",
    padding: isMobile ? "2rem 0 2rem 2rem" : "2rem 0",
  };

  const timelineLineStyle = {
    position: "absolute",
    left: isMobile ? "0" : "50%",
    top: "0",
    bottom: "0",
    width: "4px",
    background: "linear-gradient(to bottom, #1e3a8a, #f97316, #059669)",
    transform: isMobile ? "translateX(0)" : "translateX(-50%)",
    zIndex: 0,
  };

  const phaseStyle = (isLeft) => ({
    display: "flex",
    justifyContent: isMobile ? "flex-start" : (isLeft ? "flex-end" : "flex-start"),
    marginBottom: "clamp(2rem, 4vw, 3rem)",
    position: "relative",
  });

  const phaseCardStyle = {
    width: isMobile ? "100%" : "45%",
    background: "white",
    borderRadius: "12px",
    padding: "clamp(1.25rem, 3vw, 2rem)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    border: "2px solid #e2e8f0",
    position: "relative",
  };

  const phaseDotStyle = (phaseIndex) => ({
    position: "absolute",
    left: isMobile ? "-12px" : "50%",
    top: "30px",
    transform: isMobile ? "translate(-50%, -50%)" : "translate(-50%, -50%)",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "white",
    border: `4px solid ${phaseIndex === 0 ? '#1e3a8a' : phaseIndex === 1 ? '#f97316' : '#059669'}`,
    zIndex: 2,
  });

  const phases = [
    { label: "A", title: "Experimental Data Collection + Battery Digital Twin (BDT) Development", duration: "Year 1", description: "Analyse influence of battery temperature and charging current rate on Lithium-Ion Battery (LIB) degradation. Design Electrothermal Abuse (ETA) test rig with integrated on-board controller, heater bench, and communication line.", color: "#1e3a8a", lightColor: "#2563eb" },
    { label: "B", title: "Multimodal Sensing Suite with Internet of Things (IoT) + BDT Integration", duration: "Year 2", description: "Develop multi-modal sensing suite for temperature, voltage, pressure, and gas detection with ETA rig. Integrate BDT with sensing setup to forecast Thermal Runaway (TR) events and prevent abuse conditions. Real-time implementation of Artificial Intelligence (AI)-based fault detection algorithm.", color: "#f97316", lightColor: "#fb923c" },
    { label: "C", title: "Deployment of Smart Battery Safety Diagnostic System", duration: "Year 3", description: "Develop real-time anomaly detection algorithm coupled with IoT hardware board. Deployment and testing of smart battery safety diagnostics system. Implement model to optimize battery pack charging and discharging cycles to improve lifespan.", color: "#059669", lightColor: "#10b981" },
  ];

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: "800", color: "#1e293b", marginBottom: "1rem" }}>
          Timeline & Deliverables
        </h1>
        <p style={{ color: "#64748b", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>
          Three-year roadmap for Smart Battery Safety Diagnostic System
        </p>
      </div>

      <div style={timelineContainerStyle}>
        <div style={timelineLineStyle}></div>
        
        {phases.map((phase, index) => (
          <div key={index} style={phaseStyle(index % 2 === 0)}>
            <div style={phaseCardStyle}>
              <div style={{
                background: `linear-gradient(135deg, ${phase.color} 0%, ${phase.lightColor} 100%)`,
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                display: "inline-block",
                fontSize: "0.9rem",
                fontWeight: "700",
                marginBottom: "1rem",
              }}>
                Phase {phase.label} • {phase.duration}
              </div>
              <h3 style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.5rem)", color: "#1e293b", fontWeight: "700", marginBottom: "1rem" }}>
                {phase.title}
              </h3>
              <p style={{ color: "#64748b", lineHeight: "1.8" }}>
                {phase.description}
              </p>
            </div>
            <div style={phaseDotStyle(index)}></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
