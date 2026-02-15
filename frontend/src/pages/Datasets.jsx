import { useEffect, useState } from "react";
import { API_URL } from "../config";

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDatasets, setFilteredDatasets] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/datasets`)
      .then(res => res.json())
      .then(data => {
        setDatasets(data);
        setFilteredDatasets(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredDatasets(datasets);
    } else {
      const filtered = datasets.filter(dataset => 
        dataset.dataset_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dataset.dataset_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dataset.dataset_source && dataset.dataset_source.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredDatasets(filtered);
    }
  }, [searchQuery, datasets]);

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

  const searchBarContainerStyle = {
    display: "flex",
    maxWidth: "700px",
    margin: "2rem auto 0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #ddd",
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
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "1rem 2.5rem",
    fontSize: "1rem",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
  };

  const noResultsStyle = {
    textAlign: "center",
    padding: "3rem",
    color: "#555",
    fontSize: "1.1rem",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "1.5rem",
    marginTop: "2rem",
  };

  const cardStyle = {
    background: "white",
    borderRadius: "8px",
    padding: "2rem",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const sourceStyle = {
    color: "#555",
    marginTop: "1rem",
    fontSize: "0.95rem",
  };

  const citationStyle = {
    background: "#f8f9fa",
    padding: "1rem",
    borderRadius: "5px",
    marginTop: "1.5rem",
    borderLeft: "4px solid #1e293b",
    fontSize: "0.9rem",
    color: "#333",
    fontStyle: "italic",
    lineHeight: "1.6",
  };

  const citationLabelStyle = {
    fontWeight: "600",
    fontStyle: "normal",
    color: "#1e293b",
    marginBottom: "0.5rem",
  };

  const buttonStyle = {
    display: "inline-block",
    padding: "0.8rem 2rem",
    background: "#1e293b",
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
        <div style={searchBarContainerStyle}>
          <input 
            type="text" 
            placeholder="Search datasets by name, description, or source..." 
            style={searchInputStyle}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            style={searchButtonStyle}
            onMouseEnter={(e) => e.currentTarget.style.background = "#334155"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#1e293b"}
          >
            Search
          </button>
        </div>
      </div>

      {filteredDatasets.length === 0 ? (
        <div style={noResultsStyle}>
          {datasets.length === 0 ? (
            <p>No datasets available. Please add datasets to the database.</p>
          ) : (
            <p>No datasets found matching "{searchQuery}". Try a different search term.</p>
          )}
        </div>
      ) : (
        <div style={gridContainerStyle}>
          {filteredDatasets.map((d, i) => (
            <div 
              key={i} 
              style={cardStyle}
            >
            <h3>{d.dataset_name}</h3>
            <p style={{color: "#555", marginTop: "1rem", lineHeight: "1.8"}}>
              {d.dataset_description}
            </p>
            
            {d.dataset_source && (
              <div style={citationStyle}>
                <div style={citationLabelStyle}>📚 Citation:</div>
                {d.dataset_source}
              </div>
            )}
            
            <a 
              href={
                d.dataset_url.startsWith('http') 
                  ? d.dataset_url 
                  : `${API_URL}/download/${d.dataset_url}`
              }
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#334155";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1e293b";
              }}
            >
              Download Dataset
            </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Datasets;
