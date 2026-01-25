function Team() {
  const containerStyle = {
    padding: "3rem 2rem",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "3rem",
  };

  const subtitleStyle = {
    color: "#555",
    fontSize: "1.1rem",
    marginTop: "0.5rem",
  };

  const listStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    background: "white",
    padding: "2rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
  };

  const listItemStyle = {
    padding: "1rem",
    borderBottom: "1px solid #eee",
    fontSize: "1.1rem",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Project Team</h1>
        <p style={subtitleStyle}>
          Team members working on VidyutAI Dashboard
        </p>
      </div>

      <div style={listStyle}>
        <ul style={{listStyle: "none", padding: 0}}>
          <li style={listItemStyle}>Chaitanya Attanti – Backend & Database</li>
          <li style={listItemStyle}>Team Member 2 – Frontend</li>
          <li style={{...listItemStyle, borderBottom: "none"}}>Team Member 3 – Research</li>
        </ul>
      </div>
    </div>
  );
}

export default Team;
