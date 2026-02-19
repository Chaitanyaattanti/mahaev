import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ProjectOverview() {
  const [activePage, setActivePage] = useState('main');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a hash in the URL and set the active page accordingly
    if (location.hash === '#timeline') {
      setActivePage('timeline');
    } else if (location.hash === '#status') {
      setActivePage('status');
    } else if (location.hash === '#funding') {
      setActivePage('funding');
    } else if (location.hash === '#outputs') {
      setActivePage('outputs');
    }
  }, [location]);

  const handleBackToOverview = () => {
    // If there's a referrer in history, go back; otherwise go to home
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (activePage === 'timeline') return <TimelineDeliverables onBack={handleBackToOverview} />;
  if (activePage === 'status') return <CurrentStatus onBack={handleBackToOverview} />;
  if (activePage === 'funding') return <FundingAgencies onBack={handleBackToOverview} />;
  if (activePage === 'outputs') return <Outputs onBack={handleBackToOverview} />;

  // Don't render anything when no section is selected (user should access via links on other pages)
  return null;
}

// Timeline & Deliverables Component
function TimelineDeliverables({ onBack }) {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const backButtonStyle = {
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "2rem",
    transition: "all 0.3s",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "4rem",
  };

  const timelineContainerStyle = {
    position: "relative",
    padding: "2rem 0",
  };

  const timelineLineStyle = {
    position: "absolute",
    left: "50%",
    top: "0",
    bottom: "0",
    width: "4px",
    background: "linear-gradient(to bottom, #1e3a8a, #f97316, #059669)",
    transform: "translateX(-50%)",
    zIndex: 0,
  };

  const phaseStyle = (isLeft) => ({
    display: "flex",
    justifyContent: isLeft ? "flex-end" : "flex-start",
    marginBottom: "3rem",
    position: "relative",
  });

  const phaseCardStyle = {
    width: "45%",
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    border: "2px solid #e2e8f0",
    position: "relative",
  };

  const phaseDotStyle = (phaseIndex) => ({
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
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
      <button 
        style={backButtonStyle}
        onClick={onBack}
        onMouseEnter={(e) => e.currentTarget.style.background = "#334155"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#1e293b"}
      >
        ← Back to Overview
      </button>

      <div style={headerStyle}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#1e293b", marginBottom: "1rem" }}>
          Timeline & Deliverables
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.2rem" }}>
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
              <h3 style={{ fontSize: "1.5rem", color: "#1e293b", fontWeight: "700", marginBottom: "1rem" }}>
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

// Current Status Component
function CurrentStatus({ onBack }) {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const backButtonStyle = {
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "2rem",
    transition: "all 0.3s",
  };

  const statusCardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "2.5rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    border: "2px solid #e2e8f0",
  };

  const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  };

  const imageCardStyle = {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid #e2e8f0",
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const imageContainerStyle = {
    width: "100%",
    height: "250px",
    overflow: "hidden",
    background: "#f8fafc",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const imageCaptionStyle = {
    padding: "1.5rem",
  };

  const bulletStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "0.8rem",
    paddingLeft: "0.5rem",
  };

  const bulletPointStyle = {
    color: "#4b5563",
    marginRight: "0.75rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    flexShrink: 0,
    marginTop: "0.2rem",
  };

  const bulletTextStyle = {
    color: "#475569",
    fontSize: "1rem",
    lineHeight: "1.6",
  };

  const sectionTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <button 
        style={backButtonStyle}
        onClick={onBack}
        onMouseEnter={(e) => e.currentTarget.style.background = "#334155"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#1e293b"}
      >
        ← Back to Overview
      </button>

      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "800", color: "#1e293b", marginBottom: "1rem" }}>
          Current Status
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.2rem" }}>
          Ongoing research activities and recent developments
        </p>
      </div>

      {/* Project Status Indicator */}
      <div style={{
        background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
        border: "3px solid #4b5563",
        borderRadius: "16px",
        padding: "2rem",
        marginBottom: "3rem",
        textAlign: "center",
        boxShadow: "0 8px 16px rgba(59,130,246,0.2)"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "1rem",
          background: "white",
          padding: "1rem 2.5rem",
          borderRadius: "50px",
          border: "2px solid #4b5563",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#4b5563",
            animation: "pulse 2s infinite",
            boxShadow: "0 0 0 0 rgba(59,130,246,0.7)"
          }}></div>
          <span style={{
            fontSize: "1.5rem",
            fontWeight: "800",
            color: "#1e293b",
            letterSpacing: "0.02em"
          }}>
            IN DEVELOPMENT
          </span>
        </div>
        <p style={{
          marginTop: "1.5rem",
          fontSize: "1.1rem",
          color: "#1e40af",
          fontWeight: "600"
        }}>
          Active research phase - Multiple work streams in progress
        </p>
      </div>

      {/* Current Research Activities */}
      <div style={statusCardStyle}>
        <h3 style={sectionTitleStyle}>Current Research Activities</h3>
        <div style={imageGridStyle}>
          <div 
            style={imageCardStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
            }}
          >
            <div style={imageContainerStyle}>
              <img src="/mahaev/current_image_2.png" alt="Research Activity 2" style={imageStyle} />
            </div>
            <div style={imageCaptionStyle}>
              <h4 style={{ fontSize: "1.2rem", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
                IoT-Enabled EV Battery Anomaly Detection System on Jetson Orin Nano
              </h4>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Zone 1: Physical Input</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Zone 2: Edge AI Processing</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Zone 3: IoT Output</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Funding Agencies Component
function FundingAgencies({ onBack }) {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const backButtonStyle = {
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "2rem",
    transition: "all 0.3s",
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
      <button 
        style={backButtonStyle}
        onClick={onBack}
        onMouseEnter={(e) => e.currentTarget.style.background = "#334155"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#1e293b"}
      >
        ← Back to Overview
      </button>

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

// Outputs Component
function Outputs({ onBack }) {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const backButtonStyle = {
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "0.8rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    marginBottom: "2rem",
    transition: "all 0.3s",
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
      <button 
        style={backButtonStyle}
        onClick={onBack}
        onMouseEnter={(e) => e.currentTarget.style.background = "#334155"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#1e293b"}
      >
        ← Back to Overview
      </button>

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

export default ProjectOverview;
