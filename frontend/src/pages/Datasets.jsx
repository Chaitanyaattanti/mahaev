import { useEffect, useState } from "react";
import { API_URL } from "../config";

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/datasets`)
      .then(res => res.json())
      .then(data => {
        setDatasets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDownload = (url, name) => {
    // Check if it's an external URL or local file
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // External URL - open in new tab
      window.open(url, '_blank');
    } else {
      // Local file - use download endpoint
      const downloadUrl = `${API_URL}/download/${url}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = name || 'dataset';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

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

  const cardStyle = {
    background: "white",
    borderRadius: "8px",
    padding: "2rem",
    marginBottom: "1.5rem",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const sourceStyle = {
    color: "#555",
    marginTop: "1rem",
    fontSize: "0.95rem",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "0.8rem 2rem",
    background: "#5a9f7e",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
    fontWeight: "600",
    marginTop: "1rem",
    transition: "background 0.3s ease",
  };

  const loadingStyle = {
    textAlign: "center",
    padding: "3rem",
    color: "#555",
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingStyle}>
          <h2>Loading datasets...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1>Datasets Used</h1>
        <p style={subtitleStyle}>
          Explore the datasets used in battery research and electric vehicles
        </p>
      </div>

      {datasets.length === 0 ? (
        <div style={loadingStyle}>
          <p>No datasets available. Please add datasets to the database.</p>
        </div>
      ) : (
        datasets.map((d, i) => (
          <div 
            key={i} 
            style={cardStyle}
          >
            <h3>{d.dataset_name}</h3>
            <p style={{color: "#555", marginTop: "1rem", lineHeight: "1.8"}}>
              {d.dataset_description}
            </p>
            <p style={sourceStyle}>
              <strong style={{color: "#5a9f7e"}}>Source:</strong> {d.dataset_source}
            </p>
            <button 
              onClick={() => handleDownload(d.dataset_url, d.dataset_name)}
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3d7a5e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#5a9f7e";
              }}
            >
              Download Dataset
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Datasets;
