import { 
  FaBatteryFull, 
  FaChartLine, 
  FaShieldAlt, 
  FaDatabase,
  FaFire,
  FaBolt,
  FaMicrochip,
  FaEye,
  FaClipboardList,
  FaChartArea,
  FaCar,
  FaHardHat
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
  };

  const heroSectionStyle = {
    background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #f9fafb 100%)",
    padding: "5rem 4rem",
    position: "relative",
    overflow: "hidden",
    minHeight: "550px",
    borderBottom: "1px solid #e2e8f0",
  };

  const heroContentStyle = {
    maxWidth: "650px",
    position: "relative",
    zIndex: 2,
  };

  const mainTitleStyle = {
    fontSize: "3.5rem",
    fontWeight: "800",
    color: "#1e293b",
    margin: "0 0 1.5rem 0",
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  };

  const descriptionStyle = {
    fontSize: "1.15rem",
    color: "#475569",
    lineHeight: "1.7",
    marginBottom: "2.5rem",
    maxWidth: "580px",
  };

  const datasetCountStyle = {
    fontSize: "1.4rem",
    color: "#1e293b",
    marginBottom: "2rem",
    fontWeight: "700",
    letterSpacing: "0.02em",
  };

  const countNumberStyle = {
    color: "#1e3a8a",
    fontWeight: "800",
    fontSize: "1.5rem",
  };

  const searchBarContainerStyle = {
    display: "flex",
    maxWidth: "600px",
    marginBottom: "1rem",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
  };

  const searchInputStyle = {
    flex: 1,
    padding: "1rem 1.5rem",
    border: "none",
    fontSize: "1rem",
    outline: "none",
    background: "white",
    color: "#334155",
  };

  const searchButtonStyle = {
    background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
    color: "white",
    border: "none",
    padding: "1rem 3rem",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
    letterSpacing: "0.05em",
  };

  const decorativeCirclesStyle = {
    position: "absolute",
    right: "3%",
    top: "50%",
    transform: "translateY(-50%)",
    width: "600px",
    height: "500px",
    pointerEvents: "none",
    zIndex: 1,
  };

  const circleStyle = (size, color, top, left, iconSize) => ({
    position: "absolute",
    width: size,
    height: size,
    borderRadius: "50%",
    background: color,
    top: top,
    left: left,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer",
    border: "3px solid rgba(255,255,255,0.3)",
    zIndex: 2,
  });

  const categorySectionStyle = {
    padding: "4rem 3rem",
    maxWidth: "1400px",
    margin: "0 auto",
  };

  const sectionTitleStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1rem",
    textAlign: "center",
  };

  const sectionSubtitleStyle = {
    fontSize: "1.1rem",
    color: "#64748b",
    marginBottom: "3rem",
    textAlign: "center",
  };

  const projectOverviewStyle = {
    padding: "4rem 3rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
  };

  const projectCardStyle = {
    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "3rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    textAlign: "center",
  };

  const projectTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1.5rem",
    textAlign: "center",
  };

  const projectTextStyle = {
    fontSize: "1.05rem",
    color: "#475569",
    lineHeight: "1.8",
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto 1.5rem auto",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    marginTop: "2.5rem",
  };

  const primaryButtonStyle = {
    padding: "1rem 2.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)",
    color: "white",
    boxShadow: "0 4px 12px rgba(127, 29, 29, 0.3)",
  };

  const secondaryButtonStyle = {
    padding: "1rem 2.5rem",
    fontSize: "1rem",
    fontWeight: "600",
    borderRadius: "8px",
    border: "2px solid #7f1d1d",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "white",
    color: "#7f1d1d",
  };

  const keyFocusSectionStyle = {
    padding: "4rem 3rem",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "#f8fafc",
  };

  const focusGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginTop: "2rem",
  };

  const focusItemStyle = {
    background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
    padding: "2.5rem",
    borderRadius: "12px",
    border: "2px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "all 0.3s ease",
    position: "relative",
    overflow: "hidden",
  };

  const focusAccentStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "4px",
    height: "100%",
    background: "linear-gradient(180deg, #1e3a8a 0%, #2563eb 100%)",
  };

  const focusTitleStyle = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "1rem",
    lineHeight: "1.4",
  };

  const focusDescStyle = {
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.7",
    marginTop: "0.75rem",
  };

  const bulletStyle = {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "0.6rem",
  };

  const bulletPointStyle = {
    color: "#1e3a8a",
    marginRight: "0.75rem",
    fontSize: "1.1rem",
    fontWeight: "bold",
    flexShrink: 0,
  };

  const bulletTextStyle = {
    color: "#475569",
    fontSize: "1.1rem",
    lineHeight: "1.6",
  };

  const categoryGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginTop: "3rem",
  };

  const categoryCardStyle = {
    background: "white",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "2.5rem 2rem",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.04)",
    position: "relative",
    overflow: "hidden",
  };

  const iconWrapperStyle = {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1.5rem",
    boxShadow: "0 8px 16px rgba(59, 130, 246, 0.3)",
    transition: "all 0.3s ease",
  };

  const categoryTitleStyle = {
    fontSize: "1.2rem",
    color: "#1e293b",
    fontWeight: "700",
    textDecoration: "none",
    margin: "0 0 0.5rem 0",
  };

  const categoryDescStyle = {
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: "1.5",
    margin: 0,
  };

  const handleSearch = () => {
    window.location.href = '/datasets';
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroSectionStyle}>
        <div style={heroContentStyle}>
          <h1 style={mainTitleStyle}>
            Smart Battery Safety<br />
            Diagnostic System
          </h1>
          <p style={descriptionStyle}>
            A platform to showcase ongoing research - battery safety improvement under 
            Indian conditions at Smart Power Electronics Laboratory (SPEL), IIT Gandhinagar
          </p>
        </div>

        {/* Decorative Circles with Network Lines */}
        <div style={decorativeCirclesStyle}>
          {/* SVG for connection lines - matching Data.gov style */}
          <svg 
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              zIndex: 1,
            }}
          >
            {/* Lines from center (orange database) to other circles */}
            <line x1="52%" y1="38%" x2="34%" y2="14%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="12%" y2="42%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="40%" y2="78%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="70%" y2="72%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="85%" y2="38%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="74%" y2="14%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="52%" y2="8%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>
            <line x1="52%" y1="38%" x2="22%" y2="62%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.4"/>

            {/* Additional connecting lines between outer circles */}
            <line x1="34%" y1="14%" x2="52%" y2="8%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="52%" y1="8%" x2="74%" y2="14%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="74%" y1="14%" x2="85%" y2="38%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="85%" y1="38%" x2="70%" y2="72%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="70%" y1="72%" x2="40%" y2="78%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="40%" y1="78%" x2="22%" y2="62%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="22%" y1="62%" x2="12%" y2="42%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>
            <line x1="12%" y1="42%" x2="34%" y2="14%" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.3"/>

            {/* Extra web-like connections */}
            <line x1="34%" y1="14%" x2="85%" y2="38%" stroke="#cbd5e1" strokeWidth="1" opacity="0.2"/>
            <line x1="12%" y1="42%" x2="70%" y2="72%" stroke="#cbd5e1" strokeWidth="1" opacity="0.2"/>
            <line x1="52%" y1="8%" x2="40%" y2="78%" stroke="#cbd5e1" strokeWidth="1" opacity="0.2"/>
            <line x1="74%" y1="14%" x2="22%" y2="62%" stroke="#cbd5e1" strokeWidth="1" opacity="0.2"/>
            <line x1="34%" y1="14%" x2="70%" y2="72%" stroke="#cbd5e1" strokeWidth="1" opacity="0.15"/>
            <line x1="85%" y1="38%" x2="22%" y2="62%" stroke="#cbd5e1" strokeWidth="1" opacity="0.15"/>

          </svg>

          {/* Icon Circles - Arranged in circular pattern */}
          <div 
            style={circleStyle("110px", "#1e3a8a", "8%", "48%", 50)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaBatteryFull size={50} />
          </div>
          
          <div 
            style={circleStyle("100px", "#1e40af", "20%", "15%", 45)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaChartLine size={45} />
          </div>
          
          {/* Center Orange Car Circle */}
          <div 
            style={circleStyle("160px", "#f97316", "33%", "48%", 70)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaCar size={70} />
          </div>
          
          <div 
            style={circleStyle("100px", "#1e3a8a", "20%", "78%", 45)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaBolt size={45} />
          </div>
          
          <div 
            style={circleStyle("95px", "#2563eb", "65%", "15%", 42)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaDatabase size={42} />
          </div>
          
          <div 
            style={circleStyle("105px", "#1e40af", "48%", "5%", 48)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaFire size={48} />
          </div>
          
          <div 
            style={circleStyle("105px", "#1e3a8a", "65%", "78%", 48)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaMicrochip size={48} />
          </div>
          
          <div 
            style={circleStyle("95px", "#1e40af", "48%", "88%", 42)}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <FaHardHat size={42} />
          </div>

        </div>
      </div>

      {/* Project Overview Section */}
      <div style={projectOverviewStyle}>
        <div style={projectCardStyle}>
          <h2 style={projectTitleStyle}>About the Project</h2>
          <p style={projectTextStyle}>
An open-access initiative designed to advance Indian EV safety by equipping researchers and manufacturers with the high-fidelity datasets and predictive models needed to detect thermal runaway before it starts.
          </p>

          <div style={buttonContainerStyle}>
            <button 
              style={primaryButtonStyle}
              onClick={() => navigate('/about')}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(127, 29, 29, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(127, 29, 29, 0.3)";
              }}
            >
              View Project Details
            </button>
            <button 
              style={secondaryButtonStyle}
              onClick={() => navigate('/deliverables#timeline')}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#7f1d1d";
                e.currentTarget.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
                e.currentTarget.style.color = "#7f1d1d";
              }}
            >
              View Timeline
            </button>
          </div>
        </div>
      </div>



      {/* Key Focus Areas Section */}
      <div style={keyFocusSectionStyle}>
        <h2 style={sectionTitleStyle}>Key Focus Areas</h2>
        <p style={sectionSubtitleStyle}>Core research and development priorities</p>
        <div style={focusGridStyle}>
          <div 
            style={focusItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(59,130,246,0.15)";
              e.currentTarget.style.borderColor = "#1e3a8a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div style={focusAccentStyle}></div>
            <h3 style={focusTitleStyle}>↳ Battery Life Extension</h3>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Predictive diagnostics for early fault detection</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Adaptive charging strategies for optimal health</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Thermal management optimization</span>
            </div>
          </div>

          <div 
            style={focusItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(59,130,246,0.15)";
              e.currentTarget.style.borderColor = "#1e3a8a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div style={focusAccentStyle}></div>
            <h3 style={focusTitleStyle}>↳ Integrated Sensing Suite</h3>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Multi-modal sensor integration (temperature, voltage, pressure)</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Real-time data acquisition and processing</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>IoT-enabled wireless monitoring</span>
            </div>
          </div>

          <div 
            style={focusItemStyle}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(59,130,246,0.15)";
              e.currentTarget.style.borderColor = "#1e3a8a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <div style={focusAccentStyle}></div>
            <h3 style={focusTitleStyle}>↳ Physics-Inspired ML</h3>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Physics-guided machine learning models</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Anomaly detection algorithms</span>
            </div>
            <div style={bulletStyle}>
              <span style={bulletPointStyle}>•</span>
              <span style={bulletTextStyle}>Thermal runaway prediction and prevention</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
