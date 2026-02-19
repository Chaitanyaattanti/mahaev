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
    marginBottom: "2rem",
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
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
    color: "white",
    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)",
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
           A platform to showcase ongoing research for battery safety improvement in Indian conditions at Smart Power Electronics Laboratory (SPEL), IIT Gandhinagar, under ANRF MAHA-EV E-RIDES.

          </p>
        </div>

        {/* Kinetic Typography Cloud */}
        <div style={decorativeCirclesStyle}>
          <style>
            {`
              @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-15px); }
              }
              @keyframes floatSlow {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
              }
              @keyframes pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
              }
              .kinetic-text {
                position: absolute;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                user-select: none;
              }
              .kinetic-text:hover {
                transform: scale(1.15);
                filter: brightness(1.2);
              }
              .kinetic-icon {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                cursor: pointer;
              }
              .kinetic-icon:hover {
                transform: scale(1.2) rotate(5deg);
                filter: drop-shadow(0 0 8px currentColor);
              }
            `}
          </style>

          {/* Large Terms - Better spacing */}
          <div className="kinetic-text" style={{ 
            top: "8%", left: "42%", fontSize: "2.5rem", color: "#1e3a8a", 
            animation: "float 6s ease-in-out infinite"
          }}>
            BATTERY SAFETY
          </div>

          <div className="kinetic-text" style={{ 
            top: "18%", left: "68%", fontSize: "1.6rem", color: "#f97316", 
            animation: "floatSlow 5s ease-in-out infinite 1s"
          }}>
            Battery Standards
          </div>

          <div className="kinetic-text" style={{ 
            top: "38%", left: "5%", fontSize: "1.6rem", color: "#2563eb", 
            animation: "float 7s ease-in-out infinite 2s"
          }}>
            Thermal Runaway
          </div>

          <div className="kinetic-text" style={{ 
            top: "58%", left: "70%", fontSize: "2rem", color: "#1e40af", 
            animation: "floatSlow 6s ease-in-out infinite 0.5s"
          }}>
            Machine Learning
          </div>

          <div className="kinetic-text" style={{ 
            top: "78%", left: "12%", fontSize: "1.5rem", color: "#f97316", 
            animation: "float 5.5s ease-in-out infinite 1.5s"
          }}>
            Predictive
          </div>

          {/* Medium Terms */}
          <div className="kinetic-text" style={{ 
            top: "28%", left: "12%", fontSize: "1.3rem", color: "#1e3a8a", opacity: 0.8,
            animation: "floatSlow 6.5s ease-in-out infinite 2.5s"
          }}>
            Diagnostics
          </div>

          <div className="kinetic-text" style={{ 
            top: "52%", left: "42%", fontSize: "1.4rem", color: "#64748b", opacity: 0.7,
            animation: "float 7s ease-in-out infinite 1s"
          }}>
            IoT Sensors
          </div>

          <div className="kinetic-text" style={{ 
            top: "72%", left: "50%", fontSize: "1.2rem", color: "#2563eb", opacity: 0.8,
            animation: "floatSlow 5s ease-in-out infinite 2s"
          }}>
            Real-time
          </div>

          <div className="kinetic-text" style={{ 
            top: "15%", left: "22%", fontSize: "1.1rem", color: "#475569", opacity: 0.7,
            animation: "float 6s ease-in-out infinite 3s"
          }}>
            Datasets
          </div>

          <div className="kinetic-text" style={{ 
            top: "45%", left: "8%", fontSize: "1.4rem", color: "#f97316", opacity: 0.75,
            animation: "float 6s ease-in-out infinite 1.5s"
          }}>
            Electric Vehicle
          </div>

          <div className="kinetic-text" style={{ 
            top: "62%", left: "25%", fontSize: "1.3rem", color: "#1e40af", opacity: 0.75,
            animation: "floatSlow 6.5s ease-in-out infinite 2.5s"
          }}>
            Battery Testing
          </div>

          {/* Small Terms */}
          <div className="kinetic-text" style={{ 
            top: "68%", left: "35%", fontSize: "0.95rem", color: "#94a3b8", opacity: 0.6,
            animation: "pulse 4.5s ease-in-out infinite 1s"
          }}>
            Monitoring
          </div>

          <div className="kinetic-text" style={{ 
            top: "88%", left: "58%", fontSize: "0.9rem", color: "#94a3b8", opacity: 0.6,
            animation: "pulse 5s ease-in-out infinite 0.5s"
          }}>
            Lithium Batteries
          </div>

          {/* Floating Icons - Better spacing */}
          <div className="kinetic-icon" style={{ 
            top: "32%", left: "60%", color: "#f97316",
            animation: "float 5s ease-in-out infinite 0.5s"
          }}>
            <FaCar size={45} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "22%", left: "52%", color: "#1e3a8a",
            animation: "floatSlow 6s ease-in-out infinite 2s"
          }}>
            <FaBatteryFull size={36} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "52%", left: "10%", color: "#2563eb",
            animation: "pulse 3s ease-in-out infinite"
          }}>
            <FaFire size={32} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "68%", left: "65%", color: "#1e40af",
            animation: "floatSlow 7s ease-in-out infinite 1s"
          }}>
            <FaMicrochip size={30} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "82%", left: "40%", color: "#f97316",
            animation: "float 5.8s ease-in-out infinite 3s"
          }}>
            <FaBolt size={26} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "40%", left: "85%", color: "#2563eb",
            animation: "pulse 4s ease-in-out infinite 0.8s"
          }}>
            <FaChartLine size={28} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "18%", left: "8%", color: "#1e3a8a",
            animation: "floatSlow 6.5s ease-in-out infinite 1.5s"
          }}>
            <FaDatabase size={24} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "90%", left: "22%", color: "#f97316",
            animation: "float 5.8s ease-in-out infinite 2.5s"
          }}>
            <FaHardHat size={22} />
          </div>

          <div className="kinetic-icon" style={{ 
            top: "60%", left: "88%", color: "#1e40af",
            animation: "pulse 4.5s ease-in-out infinite 1.2s"
          }}>
            <FaEye size={26} />
          </div>

        </div>
      </div>

      {/* Project Overview Section */}
      <div style={projectOverviewStyle}>
        <div style={projectCardStyle}>
          <h2 style={projectTitleStyle}>About the Project</h2>
          <div style={{
            margin: "2rem 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <img 
              src="/mahaev/EV_charging_station_fire_Delhi_1654666921139_1654666944812.jpeg" 
              alt="EV Charging Station Fire Delhi" 
              style={{
                maxWidth: "600px",
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            />
          </div>
          <p style={projectTextStyle}>
Lithium-ion batteries (LIBs) power modern EVs, but their safety is challenged by harsh Indian conditions (high temperatures, humidity, and variable road loads). Abuse or faults can trigger fires and toxic gas release. Our project aims to develop a real-time early-warning system for battery abuse and fire prevention, supporting safer EV adoption in India’s net zero transition.
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
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(220, 38, 38, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
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
