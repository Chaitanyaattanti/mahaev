import { FaUser, FaUserTie, FaUserGraduate, FaFlask } from 'react-icons/fa';

function Team() {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1400px",
    margin: "0 auto",
    background: "linear-gradient(to bottom, #f8fafc 0%, #ffffff 100%)",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "4rem",
    padding: "2rem 0",
  };

  const titleStyle = {
    fontSize: "3rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    color: "#64748b",
    fontSize: "1.2rem",
    marginTop: "0.5rem",
  };

  // Principal Investigator Section
  const piSectionStyle = {
    display: "flex",
    justifyContent: "center",
    marginBottom: "4rem",
  };

  const piCardStyle = {
    background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
    borderRadius: "16px",
    padding: "2.5rem",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
    maxWidth: "400px",
    width: "100%",
    border: "3px solid rgba(255,255,255,0.3)",
  };

  const photoContainerStyle = {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    margin: "0 auto 1.5rem",
    border: "5px solid rgba(255,255,255,0.5)",
    overflow: "hidden",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const photoStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const piNameStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "white",
    marginBottom: "0.5rem",
  };

  const piRoleStyle = {
    fontSize: "1.1rem",
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

  // Section Headers
  const sectionHeaderStyle = {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: "2.5rem",
    marginTop: "3rem",
  };

  // Team Grid Styles
  const teamGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  };

  const memberCardStyle = {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    textAlign: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    border: "2px solid #e2e8f0",
    transition: "all 0.3s ease",
    cursor: "pointer",
  };

  const memberPhotoStyle = {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    margin: "0 auto 1.5rem",
    border: "4px solid #e2e8f0",
    overflow: "hidden",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const memberNameStyle = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "0.5rem",
  };

  const memberRoleStyle = {
    fontSize: "1rem",
    color: "#64748b",
    fontWeight: "500",
  };

  const iconWrapperStyle = (color) => ({
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  });

  // Placeholder icon component
  const PlaceholderIcon = ({ Icon, color }) => (
    <div style={iconWrapperStyle(color)}>
      <Icon size={30} color="white" />
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Project Team</h1>
        <p style={subtitleStyle}>MAHA-EV Battery Safety Diagnostic System</p>
      </div>

      {/* Principal Investigator */}
      <div style={piSectionStyle}>
        <div style={piCardStyle}>
          <div style={photoContainerStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 000034.png`} alt="Prof. Pallavi Bharadwaj" style={photoStyle} />
          </div>
          <h2 style={piNameStyle}>Dr. Pallavi Bharadwaj</h2>
          <p style={piRoleStyle}>Principal Investigator</p>
        </div>
      </div>

      {/* Project Manager & Scientists */}
      <div style={teamGridStyle}>
        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 000105.png`} alt="Dr Sanjeev Patil" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Dr. Sanjeev Patil</h3>
          <p style={memberRoleStyle}>Project Manager</p>
        </div>

        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 000126.png`} alt="Dr Ashish Prajapati" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Dr. Ashish Prajapati</h3>
          <p style={memberRoleStyle}>Project Scientist-II</p>
        </div>

        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 000141.png`} alt="Dr. Sirsa Aditya" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Dr. Sirsa Aditya</h3>
          <p style={memberRoleStyle}>Project Scientist-I</p>
        </div>

        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 000200.png`} alt="Dr. Samsaptak Ghosh" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Samsaptak Ghosh</h3>
          <p style={memberRoleStyle}>Project Scientist-I</p>
        </div>
      </div>

      {/* PhD Students */}
      <div style={teamGridStyle}>
        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 001336.png`} alt="Harsh Kumar" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Harsh Kumar</h3>
          <p style={memberRoleStyle}>PhD Student</p>
        </div>

        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 001352.png`} alt="Arpita Sarcar" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Arpita Sarcar</h3>
          <p style={memberRoleStyle}>PhD Student</p>
        </div>

        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 001403.png`} alt="Ambika Biswas Neela" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Ambika Biswas Neela</h3>
          <p style={memberRoleStyle}>PhD Student</p>
        </div>

        <div 
          style={memberCardStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 001414.png`} alt="Shiv Shankar Sinha" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Shiv Shankar Sinha</h3>
          <p style={memberRoleStyle}>PhD Student</p>
        </div>
      </div>

      {/* MTech Student */}
      <div style={{...teamGridStyle, justifyContent: "center"}}>
        <div 
          style={{...memberCardStyle, maxWidth: "320px"}}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(59, 130, 246, 0.15)";
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.borderColor = "#3b82f6";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,0,0,0.05)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.borderColor = "#e2e8f0";
          }}
        >
          <div style={memberPhotoStyle}>
            <img src={`${import.meta.env.BASE_URL}teams/Screenshot 2026-02-06 001447.png`} alt="Yash Nileshkumar Desai" style={photoStyle} />
          </div>
          <h3 style={memberNameStyle}>Yash Nileshkumar Desai</h3>
          <p style={memberRoleStyle}>MTech Student</p>
        </div>
      </div>
    </div>
  );
}

export default Team;
