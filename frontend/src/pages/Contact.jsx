import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaPhone, FaGlobe } from 'react-icons/fa';

function Contact() {
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    padding: "3rem 2rem",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "4rem",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "1rem",
  };

  const subtitleStyle = {
    color: "#64748b",
    fontSize: "1.2rem",
  };

  const contentWrapperStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "2px solid #e2e8f0",
    marginBottom: "2rem",
  };

  const contactItemStyle = {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.5rem",
    marginBottom: "2rem",
    padding: "1.5rem",
    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    transition: "all 0.3s ease",
  };

  const iconWrapperStyle = (color) => ({
    width: "60px",
    height: "60px",
    borderRadius: "12px",
    background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  });

  const contactLabelStyle = {
    fontSize: "0.9rem",
    color: "#64748b",
    fontWeight: "600",
    marginBottom: "0.5rem",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  const contactValueStyle = {
    fontSize: "1.2rem",
    color: "#1e293b",
    fontWeight: "600",
    lineHeight: "1.6",
  };

  const linkStyle = {
    color: "#4b5563",
    textDecoration: "none",
    transition: "color 0.3s ease",
  };

  const mapContainerStyle = {
    background: "white",
    borderRadius: "16px",
    padding: "2rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    border: "2px solid #e2e8f0",
    marginTop: "2rem",
  };

  const mapTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1.5rem",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Contact Us</h1>
        <p style={subtitleStyle}>
          Get in touch with the Smart Power Electronics Laboratory (SPEL)
        </p>
      </div>

      <div style={contentWrapperStyle}>
        <div style={cardStyle}>
          <h2 style={{ fontSize: "2rem", fontWeight: "700", color: "#1e293b", marginBottom: "2rem" }}>
            Contact Information
          </h2>

          <div 
            style={contactItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(59,130,246,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={iconWrapperStyle("#4b5563")}>
              <FaEnvelope size={28} color="white" />
            </div>
            <div>
              <div style={contactLabelStyle}>Email</div>
              <a 
                href="mailto:spel@iitgn.ac.in" 
                style={{...contactValueStyle, ...linkStyle}}
                onMouseEnter={(e) => e.currentTarget.style.color = "#2563eb"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#4b5563"}
              >
                spel@iitgn.ac.in
              </a>
            </div>
          </div>

          <div 
            style={contactItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(239,68,68,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={iconWrapperStyle("#ef4444")}>
              <FaMapMarkerAlt size={28} color="white" />
            </div>
            <div>
              <div style={contactLabelStyle}>Location</div>
              <div style={contactValueStyle}>
                Smart Power Electronics Laboratory (SPEL)<br />
                Indian Institute of Technology Gandhinagar(Academic Block 13/305)<br />
                Palaj, Gandhinagar - 382355<br />
                Gujarat, India
              </div>
            </div>
          </div>

          <div 
            style={contactItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(14,165,233,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={iconWrapperStyle("#0ea5e9")}>
              <FaLinkedin size={28} color="white" />
            </div>
            <div>
              <div style={contactLabelStyle}>LinkedIn</div>
              <a 
                href="https://www.linkedin.com/company/spel-iitgn" 
                target="_blank"
                rel="noopener noreferrer"
                style={{...contactValueStyle, ...linkStyle}}
                onMouseEnter={(e) => e.currentTarget.style.color = "#0284c7"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#4b5563"}
              >
                SPEL IIT Gandhinagar
              </a>
            </div>
          </div>

          <div 
            style={contactItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateX(8px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(16,185,129,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div style={iconWrapperStyle("#6b7280")}>
              <FaGlobe size={28} color="white" />
            </div>
            <div>
              <div style={contactLabelStyle}>Website</div>
              <a 
                href="https://labs.iitgn.ac.in/spel/home.html" 
                target="_blank"
                rel="noopener noreferrer"
                style={{...contactValueStyle, ...linkStyle}}
                onMouseEnter={(e) => e.currentTarget.style.color = "#059669"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#4b5563"}
              >
                labs.iitgn.ac.in/spel
              </a>
            </div>
          </div>
        </div>

        <div style={mapContainerStyle}>
          <h3 style={mapTitleStyle}>Find Us</h3>
          <div style={{ 
            width: "100%", 
            height: "400px", 
            borderRadius: "12px", 
            overflow: "hidden",
            border: "1px solid #e2e8f0"
          }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.2449108789746!2d72.68315931496493!3d23.213989184842627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c2adec1c1e vznon%3A0x2d9d4a0a3d4c4a0a!2sIndian%20Institute%20of%20Technology%20Gandhinagar!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="IIT Gandhinagar Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
