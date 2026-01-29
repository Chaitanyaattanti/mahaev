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
      </div>

      <div style={listStyle}>
        <ul style={{listStyle: "none", padding: 0}}>
          <li style={listItemStyle}>Prof. Pallavi Bharadwaj (PI)</li>
          <li style={listItemStyle}>Dr Sanjeev Patil (Project Manager)</li>
          <li style={listItemStyle}>Dr Ashish Prajapati (Project Scientist-II)</li>
          <li style={listItemStyle}>Dr. Sirsa Aditya (Project Scientist-I)</li>
          <li style={listItemStyle}>Samsaptak Ghosh (Project Scientist-I)</li>
          <li style={listItemStyle}>Shiv Shankar Sinha (PhD Student)</li>
          <li style={listItemStyle}>Yash Nileshkumar Desai (MTech Student)</li>
          <li style={listItemStyle}>Ambika Biswas Neela (PhD Student)</li>
          <li style={listItemStyle}>Arpita Sarcar (PhD Student)</li>
          <li style={{...listItemStyle, borderBottom: "none"}}>Harsh Kumar (PhD Student)</li>
        </ul>
      </div>
    </div>
  );
}

export default Team;
