import { useEffect } from 'react';

function CurrentStatus() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    padding: "4rem 2rem",
  };

  const headerStyle = {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "1rem",
    textAlign: "center",
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    color: "#475569",
    textAlign: "center",
    marginBottom: "3rem",
  };

  const statusIndicatorStyle = {
    background: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    border: "3px solid #4b5563",
    borderRadius: "16px",
    padding: "2rem",
    marginBottom: "3rem",
    textAlign: "center",
    boxShadow: "0 8px 16px rgba(59,130,246,0.2)",
    maxWidth: "800px",
    margin: "0 auto 3rem",
  };

  const contentStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "3rem",
    marginTop: "2rem",
  };

  const imageCardStyle = {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
  };

  const imageContainerStyle = {
    width: "100%",
    overflow: "hidden",
    background: "#f8fafc",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    display: "block",
  };

  const imageCaptionStyle = {
    padding: "1.5rem",
  };

  const bulletStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    marginBottom: "0.75rem",
  };

  const bulletPointStyle = {
    color: "#1e3a8a",
    fontSize: "1.2rem",
    fontWeight: "bold",
    flexShrink: 0,
    marginTop: "0.1rem",
  };

  const bulletTextStyle = {
    color: "#475569",
    fontSize: "0.95rem",
    lineHeight: "1.6",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Current Status</h1>
      <p style={subtitleStyle}>
        Active Research & Development Progress
      </p>

      {/* Status Indicator */}
      <div style={statusIndicatorStyle}>
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

      {/* Research Activities */}
      <div style={contentStyle}>
        <div style={imageGridStyle}>
          {/* Image 1 */}
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
              <img src="/mahaev/current_image_1.png" alt="Battery Testing Infrastructure" style={imageStyle} />
            </div>
            <div style={imageCaptionStyle}>
              <h4 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
                Battery Testing Infrastructure
              </h4>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Advanced experimental setup for battery safety analysis</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Thermal runaway detection and monitoring systems</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Multi-chemistry battery testing capabilities</span>
              </div>
            </div>
          </div>

          {/* Image 2 */}
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
              <img src="/mahaev/current_image_2.png" alt="IoT-Enabled System" style={imageStyle} />
            </div>
            <div style={imageCaptionStyle}>
              <h4 style={{ fontSize: "1.3rem", fontWeight: "700", color: "#1e293b", marginBottom: "1rem" }}>
                IoT-Enabled EV Battery Anomaly Detection System
              </h4>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Zone 1: Physical Input - Multi-modal sensor integration</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Zone 2: Edge AI Processing (Jetson Orin Nano)</span>
              </div>
              <div style={bulletStyle}>
                <span style={bulletPointStyle}>•</span>
                <span style={bulletTextStyle}>Zone 3: IoT Output & Real-time Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentStatus;
