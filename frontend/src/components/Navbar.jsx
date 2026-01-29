import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  
  const navStyle = {
    padding: "1rem 2rem",
    background: "#5a9f7e",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const logoTextStyle = {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "white",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
  };

  const getLinkStyle = (path) => ({
    color: "white",
    fontWeight: location.pathname === path ? "600" : "500",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    transition: "all 0.3s ease",
    background: location.pathname === path ? "rgba(255, 255, 255, 0.2)" : "transparent",
  });

  return (
    <nav style={navStyle}>
      <div style={logoContainerStyle}>
        <div style={logoTextStyle}>MAHA-EV-DASHBOARD</div>
      </div>
      <div style={navLinksStyle}>
        <Link to="/" style={getLinkStyle("/")}>Home</Link>
        <Link to="/deliverables" style={getLinkStyle("/deliverables")}>Project Overview</Link>
        <Link to="/datasets" style={getLinkStyle("/datasets")}>Datasets</Link>
        <Link to="/team" style={getLinkStyle("/team")}>Team</Link>
      </div>
    </nav>
  );
}

export default Navbar;
