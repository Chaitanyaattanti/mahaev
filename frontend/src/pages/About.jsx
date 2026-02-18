import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
  };

  const headerSectionStyle = {
    padding: "3rem 2rem",
    background: "white",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "2rem",
    textAlign: "center",
  };

  const sectionStyle = {
    padding: "4rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const missionBgStyle = {
    background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
    padding: "4rem 2rem",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "3rem",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1.5rem",
  };

  const textStyle = {
    fontSize: "1.05rem",
    color: "#475569",
    lineHeight: "1.8",
    marginBottom: "1rem",
  };

  const highlightTextStyle = {
    ...textStyle,
    fontWeight: "600",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "1rem 2rem",
    marginTop: "1.5rem",
    background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(127, 29, 29, 0.3)",
    textDecoration: "none",
  };

  const iconGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  };

  const iconBoxStyle = {
    textAlign: "center",
    padding: "2rem",
  };

  const iconWrapperStyle = {
    width: "80px",
    height: "80px",
    margin: "0 auto 1rem",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.5rem",
  };

  const iconLabelStyle = {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1e293b",
  };

  const mediaBoxStyle = {
    background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    padding: "3rem",
    borderRadius: "12px",
    border: "2px solid #fbbf24",
    marginTop: "3rem",
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerSectionStyle}>
        <h1 style={titleStyle}>About Us</h1>
      </div>

      {/* Mission Section */}
      <section style={sectionStyle}>
        <div style={gridStyle}>
          <div>
            <h4 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
              Mission
            </h4>
            <p style={textStyle}>
              <strong>The Challenge:</strong> India's rapid electric vehicle adoption faces a critical barrier. Standard battery management systems often fail to detect early warning signs under real-world conditions, leaving vehicles vulnerable to thermal runaway.
            </p>
            <p style={textStyle}>
              <strong>Solution:</strong> The MAHA-EV Project develops a Smart Battery Safety Diagnostic System using multi-modal sensing to monitor gas emissions, pressure, temperature, and voltage simultaneously, powered by physics-guided machine learning. This enables early detection of battery abuse signatures and thermal runaway prediction, ensuring safer EV battery systems.
            </p>
            <a
              href="/mahaev/deliverables#timeline"
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(127, 29, 29, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(127, 29, 29, 0.3)";
              }}
            >
              Explore the Timeline →
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
              src="/mahaev/motivation.jpeg"
              alt="MAHA-EV Project Motivation"
              style={{
                maxWidth: "100%",
                height: "auto",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Combined Info Section */}
      <section style={missionBgStyle}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={gridStyle}>
            <div>
              <h2 style={headingStyle}>Aligned with National Safety Standards</h2>
              <p style={textStyle}>
                Our research aligns with Bureau of Indian Standards (BIS) regulations for electric vehicle battery safety.
              </p>
              <button
                style={buttonStyle}
                onClick={() => navigate('/standards')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(127, 29, 29, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(127, 29, 29, 0.3)";
                }}
              >
                View Indian Safety Standards →
              </button>
            </div>
            <div>
              <h2 style={headingStyle}>Project Development & Funding</h2>
              <p style={textStyle}>
                The MAHA-EV project is being developed at IIT Gandhinagar's{" "}
                <a
                  href="https://labs.iitgn.ac.in/spel/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#7f1d1d", fontWeight: "600" }}
                >
                  Smart Power and Energy Laboratory (SPEL)
                </a>
                . The project is supported by leading funding agencies committed to advancing electric vehicle
                safety and sustainable energy solutions.
              </p>
              <button
                style={buttonStyle}
                onClick={() => navigate('/deliverables#funding')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(127, 29, 29, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(127, 29, 29, 0.3)";
                }}
              >
                View Funding Agencies →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Status Section */}
      <section style={{ ...sectionStyle, background: "white", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ ...headingStyle, textAlign: "center", marginBottom: "2rem" }}>
            Current Status
          </h2>
          
          {/* Status Indicator */}
          <div style={{
            background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
            border: "3px solid #4b5563",
            borderRadius: "16px",
            padding: "2rem",
            marginBottom: "3rem",
            textAlign: "center",
            boxShadow: "0 8px 16px rgba(59,130,246,0.2)",
            maxWidth: "800px",
            margin: "0 auto 3rem",
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
                boxShadow: "0 0 0 4px rgba(59,130,246,0.3)"
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

          {/* First Row - Images 1 and 2 side by side */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "3rem",
            marginTop: "2rem",
            marginBottom: "3rem",
          }}>
            {/* Image 1 */}
            <div 
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                border: "1px solid #e2e8f0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ width: "100%", overflow: "hidden", background: "#f8fafc" }}>
                <img 
                  src="/mahaev/current_image_1.png" 
                  alt="Battery Testing Infrastructure" 
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                  Electrothermal Abuse (ETA) Test Setup
                </h4>
              </div>
            </div>

            {/* Image 2 */}
            <div 
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                border: "1px solid #e2e8f0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ width: "100%", overflow: "hidden", background: "#f8fafc" }}>
                <img 
                  src="/mahaev/current_image_2.png" 
                  alt="IoT-Enabled System" 
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                  Anomaly Detection Using Deep Learning
                </h4>
              </div>
            </div>
          </div>

          {/* Second Row - Image 3 full width */}
          <div style={{ marginTop: "2rem" }}>
            <div 
              style={{
                background: "white",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                border: "1px solid #e2e8f0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.08)";
              }}
            >
              <div style={{ width: "100%", overflow: "hidden", background: "#f8fafc" }}>
                <img 
                  src="/mahaev/current_image_3.png" 
                  alt="Research Development" 
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
              <div style={{ padding: "1.5rem", textAlign: "center" }}>
                <h4 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                  Battery Digital Twin Based Adaptive RL
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
