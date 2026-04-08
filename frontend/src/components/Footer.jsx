import { Link } from "react-router-dom";

function Footer() {
  const footerStyle = {
    background: "#1e293b",
    color: "#e2e8f0",
    padding: "clamp(2rem, 5vw, 4rem) clamp(1rem, 2vw, 2rem)",
    marginTop: "4rem",
    borderTop: "1px solid #334155",
  };

  const containerStyle = {
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const contentStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "clamp(2rem, 4vw, 3rem)",
    marginBottom: "3rem",
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  };

  const sectionTitleStyle = {
    fontSize: "clamp(1rem, 2vw, 1.1rem)",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  const linkStyle = {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
    transition: "color 0.3s ease",
    cursor: "pointer",
  };

  const externalLinkStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
    transition: "color 0.3s ease",
  };

  const bottomSectionStyle = {
    borderTop: "1px solid #334155",
    paddingTop: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    alignItems: "center",
    textAlign: "center",
  };

  const logoTextStyle = {
    fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
    fontWeight: "600",
    color: "#3b82f6",
  };

  const disclaimerStyle = {
    fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
    color: "#94a3b8",
    lineHeight: "1.6",
  };

  const bottomLinksStyle = {
    display: "flex",
    gap: "clamp(0.5rem, 2vw, 1.5rem)",
    flexWrap: "wrap",
    justifyContent: "center",
    fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          {/* About Section */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>About</div>
            <Link 
              to="/about" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              About Project
            </Link>
            <Link 
              to="/team" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Team
            </Link>
            <a 
              href="https://labs.iitgn.ac.in/spel/home.html" 
              target="_blank"
              rel="noopener noreferrer"
              style={externalLinkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              SPEL Lab
            </a>
          </div>

          {/* Resources Section */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Resources</div>
            <Link 
              to="/datasets" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Datasets
            </Link>
            <Link 
              to="/publications" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Publications
            </Link>
            <Link 
              to="/standards" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Standards
            </Link>
          </div>

          {/* Tools Section */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Tools</div>
            <Link 
              to="/predictor" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Battery Predictor
            </Link>
            <Link 
              to="/timeline" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Timeline
            </Link>
            <Link 
              to="/funding" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Funding
            </Link>
          </div>

          {/* Get in Touch Section */}
          <div style={sectionStyle}>
            <div style={sectionTitleStyle}>Get in Touch</div>
            <Link 
              to="/contact" 
              style={linkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Contact Us
            </Link>
            <a 
              href="https://iitgn.ac.in/" 
              target="_blank"
              rel="noopener noreferrer"
              style={externalLinkStyle}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              IIT Gandhinagar
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={bottomSectionStyle}>
          <div style={logoTextStyle}>MAHA-EV-MISSION</div>
          <p style={disclaimerStyle}>
            Smart Battery Safety Diagnostic System for Electric Vehicles.<br />
            Research initiative by IIT Gandhinagar's Sustainable Power Electronics Lab (SPEL).
          </p>
          <div style={bottomLinksStyle}>
            <a 
              href="#privacy" 
              style={{...externalLinkStyle, margin: 0}}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Privacy Policy
            </a>
            <span style={{color: "#476569"}}>|</span>
            <a 
              href="#terms" 
              style={{...externalLinkStyle, margin: 0}}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Terms of Use
            </a>
            <span style={{color: "#476569"}}>|</span>
            <a 
              href="#accessibility" 
              style={{...externalLinkStyle, margin: 0}}
              onMouseEnter={(e) => e.currentTarget.style.color = "#3b82f6"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#cbd5e1"}
            >
              Accessibility
            </a>
          </div>
          <p style={{...disclaimerStyle, marginTop: "1rem"}}>
            © {new Date().getFullYear()} IIT Gandhinagar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
