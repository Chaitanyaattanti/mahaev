import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navStyle = {
    padding: "clamp(0.75rem, 2vw, 1rem) clamp(1rem, 4vw, 2rem)",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e2e8f0",
    position: "relative",
    zIndex: 100,
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(0.5rem, 2vw, 1rem)",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(1.5rem, 4vw, 3rem)",
  };

  const logoImageStyle = {
    height: "clamp(40px, 8vw, 50px)",
    width: "auto",
    cursor: "pointer",
  };

  const logoTextStyle = {
    fontSize: "clamp(0.9rem, 1.5vw, 1.3rem)",
    fontWeight: "700",
    color: "#1e293b",
  };

  const logoTextContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
    alignItems: "center",
  };

  const subTextStyle = {
    fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
    fontWeight: "500",
    color: "#64748b",
    textAlign: "center",
    lineHeight: "1.2",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "clamp(1rem, 2vw, 2rem)",
    alignItems: "center",
  };

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? "#1e293b" : "#64748b",
    fontWeight: location.pathname === path ? "600" : "500",
    padding: "clamp(0.4rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem)",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    background: location.pathname === path ? "#f1f5f9" : "transparent",
    fontSize: "clamp(0.85rem, 1vw, 1rem)",
    whiteSpace: "nowrap",
  });

  const mobileMenuStyle = {
    position: "fixed",
    top: "60px",
    left: 0,
    right: 0,
    background: "#ffffff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    display: isMenuOpen ? "flex" : "none",
    flexDirection: "column",
    gap: "0",
    zIndex: 99,
    maxHeight: "calc(100vh - 60px)",
    overflowY: "auto",
    borderBottom: "1px solid #e2e8f0",
  };

  const mobileMenuLinkStyle = (path) => ({
    color: location.pathname === path ? "#1e293b" : "#64748b",
    fontWeight: location.pathname === path ? "600" : "500",
    padding: "1rem 1.5rem",
    borderRadius: "0",
    transition: "all 0.3s ease",
    background: location.pathname === path ? "#f1f5f9" : "transparent",
    fontSize: "0.95rem",
    borderBottom: "1px solid #e2e8f0",
    display: "block",
    textAlign: "left",
    cursor: "pointer",
  });

  const hamburgerButtonStyle = {
    display: "none",
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#1e293b",
    padding: "0.5rem",
    minWidth: "44px",
    minHeight: "44px",
    alignItems: "center",
    justifyContent: "center",
  };

  const navLinksContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0",
  };

  // Mobile styles
  const mobileNavStyle = {
    ...navStyle,
    "@media (max-width: 768px)": {
      padding: "0.75rem 1rem",
    },
  };

  const mobileHamburgerStyle =
    typeof window !== "undefined" && window.innerWidth <= 768
      ? { ...hamburgerButtonStyle, display: "flex" }
      : hamburgerButtonStyle;

  const mobileNavLinksStyle =
    typeof window !== "undefined" && window.innerWidth <= 768
      ? { display: "none" }
      : navLinksStyle;

  const mobileLogoTextStyle =
    typeof window !== "undefined" && window.innerWidth <= 768
      ? { ...logoTextStyle, fontSize: "clamp(0.8rem, 1vw, 1.1rem)" }
      : logoTextStyle;

  return (
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
            <div style={mobileLogoTextStyle}>MAHA-EV-MISSION</div>
            <div style={{...mobileLogoTextStyle, fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)"}}>IIT Gandhinagar</div>
          </div>
        </div>
        <div style={{display: "flex", alignItems: "center", gap: "1rem"}}>
          <div style={mobileNavLinksStyle}>
            <Link to="/" style={getLinkStyle("/")}>Home</Link>
            <Link to="/datasets" style={getLinkStyle("/datasets")}>Datasets</Link>
            <Link to="/predictor" style={getLinkStyle("/predictor")}>Predictor</Link>
            <Link to="/deliverables#outputs" style={getLinkStyle("/deliverables#outputs")}>Publications</Link>
            <Link to="/team" style={getLinkStyle("/team")}>Team</Link>
            <Link to="/contact" style={getLinkStyle("/contact")}>Contact</Link>
          </div>
        </div>
      </div>

      {/* Hamburger Menu Button */}
      <button 
        style={mobileHamburgerStyle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        <Link 
          to="/" 
          style={mobileMenuLinkStyle("/")}
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link 
          to="/datasets" 
          style={mobileMenuLinkStyle("/datasets")}
          onClick={() => setIsMenuOpen(false)}
        >
          Datasets
        </Link>
        <Link 
          to="/predictor" 
          style={mobileMenuLinkStyle("/predictor")}
          onClick={() => setIsMenuOpen(false)}
        >
          Battery Predictor
        </Link>
        <Link 
          to="/deliverables#outputs" 
          style={mobileMenuLinkStyle("/deliverables#outputs")}
          onClick={() => setIsMenuOpen(false)}
        >
          Outputs & Publications
        </Link>
        <Link 
          to="/team" 
          style={mobileMenuLinkStyle("/team")}
          onClick={() => setIsMenuOpen(false)}
        >
          Team
        </Link>
        <Link 
          to="/contact" 
          style={mobileMenuLinkStyle("/contact")}
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
