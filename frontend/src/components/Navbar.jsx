import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1280);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  const navStyle = {
    padding: "clamp(0.55rem, 1.2vw, 1rem) clamp(0.5rem, 1.5vw, 1rem)",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e2e8f0",
    flexWrap: "nowrap",
    overflow: "hidden",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(0.5rem, 1vw, 0.8rem)",
    flexShrink: 0,
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? "clamp(0.5rem, 1vw, 0.8rem)" : "clamp(1.5rem, 2.5vw, 2.5rem)",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  };

  const logoImageStyle = {
    height: "clamp(30px, 5vw, 45px)",
    width: "auto",
    cursor: "pointer",
  };

  const logoTextStyle = {
    fontSize: "clamp(0.75rem, 1.8vw, 1.1rem)",
    fontWeight: "700",
    color: "#1e293b",
  };

  const logoTextContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.05rem",
    alignItems: "center",
    minWidth: 0,
    overflow: "hidden",
  };

  const subTextStyle = {
    fontSize: "0.75rem",
    fontWeight: "500",
    color: "#64748b",
    textAlign: "center",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "clamp(1.2rem, 2vw, 2rem)",
    alignItems: "center",
    flexShrink: 0,
  };

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? "#1e293b" : "#64748b",
    fontWeight: location.pathname === path ? "600" : "500",
    padding: "clamp(0.3rem, 0.8vw, 0.5rem) clamp(0.6rem, 1.2vw, 0.9rem)",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    background: location.pathname === path ? "#f1f5f9" : "transparent",
    fontSize: "clamp(0.8rem, 1.5vw, 0.95rem)",
    whiteSpace: "nowrap",
  });

  const hamburgerStyle = {
    display: "none",
    flexDirection: "column",
    gap: "5px",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: "0.5rem",
  };

  const hamburgerLineStyle = {
    width: "24px",
    height: "3px",
    background: "#1e293b",
    borderRadius: "2px",
    transition: "all 0.3s ease",
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: "60px",
    left: 0,
    right: 0,
    background: "white",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    maxHeight: isMenuOpen ? "calc(100vh - 60px)" : "0",
    overflow: "hidden",
    transition: "max-height 0.3s ease",
    zIndex: 999,
    display: "flex",
    flexDirection: "column",
  };

  const mobileMenuItemStyle = {
    padding: "1rem 1.5rem",
    borderBottom: "1px solid #e2e8f0",
  };

  // Show hamburger on mobile
  if (isMobile) {
    hamburgerStyle.display = "flex";
  }

  return (
    <>
      <nav style={navStyle}>
        <div style={leftSectionStyle}>
          <div style={logoContainerStyle}>
            <a 
              href="https://labs.iitgn.ac.in/spel/home.html" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{textDecoration: "none", display: "flex"}}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              <img src={`${import.meta.env.BASE_URL}spel-logo.png`} alt="SPEL Logo" style={logoImageStyle} />
            </a>
            <div style={logoTextContainerStyle}>
              <div style={logoTextStyle}>MAHA-EV-MISSION</div>
              <div style={logoTextStyle}>IIT Gandhinagar</div>
            </div>
          </div>
          {!isMobile && (
            <div style={navLinksStyle}>
              <Link to="/" style={getLinkStyle("/")}>Home</Link>
              <Link to="/datasets" style={getLinkStyle("/datasets")}>Datasets</Link>
              <Link to="/predictor" style={getLinkStyle("/predictor")}>Battery Predictor</Link>
              <Link to="/publications" style={getLinkStyle("/publications")}>Outputs & Publications</Link>
              <Link to="/team" style={getLinkStyle("/team")}>Team</Link>
              <Link to="/contact" style={getLinkStyle("/contact")}>Contact Us</Link>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: "clamp(0.5rem, 1vw, 0.75rem)", alignItems: "center", minWidth: 0 }}>
          <a 
            href="https://iitgn.ac.in/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{textDecoration: "none", display: "flex", flexShrink: 0}}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <div style={logoContainerStyle}>
              <img src={`${import.meta.env.BASE_URL}icon.jpeg`} alt="IIT Gandhinagar Logo" style={{...logoImageStyle, height: "clamp(35px, 5vw, 48px)"}} />
            </div>
          </a>

          {isMobile && (
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={hamburgerStyle}
              aria-label="Toggle menu"
            >
              <div style={{
                ...hamburgerLineStyle,
                transform: isMenuOpen ? "rotate(45deg) translateY(11px)" : "none",
              }} />
              <div style={{
                ...hamburgerLineStyle,
                opacity: isMenuOpen ? 0 : 1,
              }} />
              <div style={{
                ...hamburgerLineStyle,
                transform: isMenuOpen ? "rotate(-45deg) translateY(-11px)" : "none",
              }} />
            </button>
          )}
        </div>
      </nav>

      {isMobile && (
        <div style={mobileMenuStyle}>
          <div style={mobileMenuItemStyle}>
            <Link to="/" style={{textDecoration: "none", ...getLinkStyle("/"), display: "block"}}>Home</Link>
          </div>
          <div style={mobileMenuItemStyle}>
            <Link to="/datasets" style={{textDecoration: "none", ...getLinkStyle("/datasets"), display: "block"}}>Datasets</Link>
          </div>
          <div style={mobileMenuItemStyle}>
            <Link to="/predictor" style={{textDecoration: "none", ...getLinkStyle("/predictor"), display: "block"}}>Battery Predictor</Link>
          </div>
          <div style={mobileMenuItemStyle}>
            <Link to="/publications" style={{textDecoration: "none", ...getLinkStyle("/publications"), display: "block"}}>Outputs & Publications</Link>
          </div>
          <div style={mobileMenuItemStyle}>
            <Link to="/team" style={{textDecoration: "none", ...getLinkStyle("/team"), display: "block"}}>Team</Link>
          </div>
          <div style={mobileMenuItemStyle}>
            <Link to="/contact" style={{textDecoration: "none", ...getLinkStyle("/contact"), display: "block"}}>Contact Us</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
