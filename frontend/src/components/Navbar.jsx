import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  const navStyle = {
    padding: "1rem 2rem",
    background: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    borderBottom: "1px solid #e2e8f0",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
    transition: "opacity 0.3s ease",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "3rem",
  };

  const logoImageStyle = {
    height: "50px",
    width: "auto",
  };

  const logoTextStyle = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  };

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? "#1e293b" : "#64748b",
    fontWeight: location.pathname === path ? "600" : "500",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    background: location.pathname === path ? "#f1f5f9" : "transparent",
  });

  return (
    <nav style={navStyle}>
      <div style={leftSectionStyle}>
        <a 
          href="https://labs.iitgn.ac.in/spel/home.html" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{textDecoration: "none"}}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        >
          <div style={logoContainerStyle}>
            <img src={`${import.meta.env.BASE_URL}spel-logo.png`} alt="SPEL Logo" style={logoImageStyle} />
            <div style={logoTextStyle}>MAHA-EV-DASHBOARD</div>
          </div>
        </a>
        <div style={navLinksStyle}>
          <Link to="/" style={getLinkStyle("/")}>Home</Link>
          <Link to="/deliverables" style={getLinkStyle("/deliverables")}>Project Overview</Link>
          <Link to="/datasets" style={getLinkStyle("/datasets")}>Datasets</Link>
          <Link to="/team" style={getLinkStyle("/team")}>Team</Link>
          <Link to="/contact" style={getLinkStyle("/contact")}>Contact Us</Link>
        </div>
      </div>
      <div style={logoContainerStyle}>
        <img src={`${import.meta.env.BASE_URL}icon.jpeg`} alt="IIT Gandhinagar Logo" style={{...logoImageStyle, height: "55px"}} />
      </div>
    </nav>
  );
}

export default Navbar;
