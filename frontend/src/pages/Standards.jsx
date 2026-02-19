import { useEffect } from 'react';

function Standards() {
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

  const contentStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const sectionStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "3rem",
    marginBottom: "3rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
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

  const imageContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "3rem",
    marginTop: "2rem",
  };

  const imageBoxStyle = {
    background: "#f8fafc",
    borderRadius: "12px",
    padding: "2rem",
    border: "2px solid #e2e8f0",
    transition: "all 0.3s ease",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    marginBottom: "1.5rem",
  };

  const imageTitleStyle = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1rem",
  };

  const imageDescStyle = {
    fontSize: "1rem",
    color: "#475569",
    lineHeight: "1.7",
  };

  const bulletListStyle = {
    marginTop: "1.5rem",
    paddingLeft: "1.5rem",
  };

  const bulletItemStyle = {
    marginBottom: "0.8rem",
    fontSize: "1rem",
    color: "#475569",
    lineHeight: "1.7",
  };

  const linkStyle = {
    color: "#1e40af",
    textDecoration: "none",
    fontWeight: "600",
    transition: "all 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Indian Standards for Battery Safety</h1>

      <div style={contentStyle}>
        <section style={sectionStyle}>
          <div style={imageContainerStyle}>
            <div style={imageBoxStyle}>
              <img 
                src="/mahaev/Standard-1.png" 
                alt="Automotive Industry Standards in India under CMVR"
                style={imageStyle}
              />
              <h3 style={imageTitleStyle}>AIS-038 Rev.2: Power-Driven Vehicles and Components - Requirements for Electric Power Train</h3>
              
              <div style={{ marginTop: "1.5rem" }}>
                <ul style={bulletListStyle}>
                  <li style={bulletItemStyle}>
                    <a 
                      href="https://evreporter.com/battery-safety-standards-in-india-by-arai/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#1e3a8a";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#1e40af";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      Battery Safety Standards in India by ARAI - EV Reporter
                    </a>
                  </li>
                  <li style={bulletItemStyle}>
                    <a 
                      href="https://morth.nic.in/sites/default/files/ASI/AIS-038_Rev.2.doc.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#1e3a8a";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#1e40af";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      AIS-038: Battery + Vehicle Safety (M&N Category)
                    </a>
                  </li>
                  <li style={bulletItemStyle}>
                    <a 
                      href="https://morth.nic.in/sites/default/files/ASI/AIS-156.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={linkStyle}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#1e3a8a";
                        e.currentTarget.style.textDecoration = "underline";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#1e40af";
                        e.currentTarget.style.textDecoration = "none";
                      }}
                    >
                      AIS-156: Battery + Vehicle Safety (L Category)
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div style={imageBoxStyle}>
              <img 
                src="/mahaev/Standard-2.png" 
                alt="AIS-156 Battery Safety Standards"
                style={imageStyle}
              />
              <h3 style={imageTitleStyle}>AIS-156: Battery Operated Vehicles - Safety Requirements</h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Standards;
