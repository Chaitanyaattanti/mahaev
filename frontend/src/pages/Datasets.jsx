import { useEffect, useState } from "react";
import { API_URL } from "../config";

// Fallback datasets for when API is unavailable
const FALLBACK_DATASETS = [
  {
    dataset_name: "LG 18650HG2 Li-ion Battery Data",
    dataset_description: "Deep neural network SOC estimator script with comprehensive Li-ion battery dataset",
    dataset_source: "https://www.data.nrel.gov/",
    dataset_features: "Voltage, Current, Temperature, SOC",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway - V1",
    dataset_description: "Thermal runaway analysis for Li-ion batteries under mechanical stress",
    dataset_source: "NREL Battery Research",
    dataset_features: "Temperature, Pressure, Time Series",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Mechanically Induced Thermal Runaway - V2",
    dataset_description: "Advanced thermal runaway testing with extended measurements",
    dataset_source: "NREL Battery Research",
    dataset_features: "Temperature, Pressure, Voltage",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Temperature Effects on SOC Estimation",
    dataset_description: "Impact of temperature on state-of-charge estimation accuracy",
    dataset_source: "NREL Battery Research",
    dataset_features: "Temperature, SOC, Voltage",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Drive Cycle SOC Analysis",
    dataset_description: "SOC behavior under real-world driving cycles",
    dataset_source: "NREL Battery Research",
    dataset_features: "Current, Voltage, SOC, Time",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Open Circuit Voltage Curves",
    dataset_description: "OCV characteristics across different battery states and temperatures",
    dataset_source: "Stanford Battery Lab",
    dataset_features: "Voltage, SOC, Temperature",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Cycle Degradation Study",
    dataset_description: "Battery performance degradation over charge-discharge cycles",
    dataset_source: "Argonne National Lab",
    dataset_features: "Cycle Number, Capacity, Voltage",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Pulsed Loading Test Data",
    dataset_description: "Battery response to pulsed current loads",
    dataset_source: "NREL Battery Research",
    dataset_features: "Current Pulse, Voltage Response, Temperature",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Partial SOC Cycling",
    dataset_description: "Extended cycling within partial state-of-charge operating window",
    dataset_source: "NREL Battery Research",
    dataset_features: "SOC Range, Cycle Count, Capacity Fade",
    dataset_url: "https://www.data.nrel.gov/"
  },
  {
    dataset_name: "Calendar Aging Analysis",
    dataset_description: "Battery aging under storage conditions at various temperatures",
    dataset_source: "Argonne National Lab",
    dataset_features: "Time, Temperature, Capacity Retention",
    dataset_url: "https://www.data.nrel.gov/"
  }
];

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDatasets, setFilteredDatasets] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  const [uploadForm, setUploadForm] = useState({
    name: "",
    description: "",
    source: "",
    features: "",
    url: "",
  });

  useEffect(() => {
    fetch(`${API_URL}/datasets`)
      .then(res => res.json())
      .then(data => {
        // Remove any temporary/test entries that should not appear
        const cleaned = data.filter((d) => {
          const name = (d.dataset_name || "").trim().toLowerCase();
          return name !== "test" && name !== "cs" && name !== "wert";
        });

        // Sort datasets by category
        const sortedData = cleaned.sort((a, b) => {
          const getCategoryPriority = (name) => {
            const nameLower = name.toLowerCase();
            if (nameLower.includes('temperature') || nameLower.includes('thermal')) return 1;
            if (nameLower.includes('pressure')) return 2;
            if (nameLower.includes('aging') || nameLower.includes('degradation') || nameLower.includes('cycle')) return 3;
            if (nameLower.includes('voltage') || nameLower.includes('impedance')) return 4;
            if (nameLower.includes('gas') || nameLower.includes('emission')) return 5;
            return 6;
          };
          return getCategoryPriority(a.dataset_name) - getCategoryPriority(b.dataset_name);
        });
        setDatasets(sortedData);
        setFilteredDatasets(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        // Use fallback datasets when API fails
        setDatasets(FALLBACK_DATASETS);
        setFilteredDatasets(FALLBACK_DATASETS);
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

  const getCategoryColor = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('temperature') || nameLower.includes('thermal')) return '#ff6b35'; // Red-orange for temperature
    if (nameLower.includes('pressure')) return '#3b82f6'; // Blue for pressure
    if (nameLower.includes('aging') || nameLower.includes('degradation') || nameLower.includes('cycle')) return '#a855f7'; // Purple for aging
    if (nameLower.includes('voltage') || nameLower.includes('impedance')) return '#10b981'; // Green for voltage
    if (nameLower.includes('gas') || nameLower.includes('emission')) return '#f59e0b'; // Amber for gas
    return '#64748b'; // Gray for others
  };

  const getCardStyle = (name) => ({
    background: "white",
    borderRadius: "8px",
    padding: "2rem",
    border: "1px solid #ddd",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  });

  const containerStyle = {
    padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2rem)",
    maxWidth: "1200px",
    margin: "0 auto",
    background: "white",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "clamp(1.5rem, 3vw, 3rem)",
  };

  const subtitleStyle = {
    color: "#555",
    fontSize: "1.1rem",
    marginTop: "0.5rem",
  };

  const searchBarContainerStyle = {
    display: "flex",
    maxWidth: "700px",
    margin: "clamp(1rem, 2vw, 2rem) auto 0",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #ddd",
    flexDirection: window.innerWidth <= 768 ? "column" : "row",
  };

  const searchInputStyle = {
    flex: 1,
    padding: "clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.5rem)",
    border: "none",
    fontSize: "clamp(0.85rem, 1vw, 1rem)",
    outline: "none",
    background: "white",
    color: "#334155",
    minHeight: "44px",
  };

  const searchButtonStyle = {
    background: "#1e293b",
    color: "white",
    border: "none",
    padding: "clamp(0.6rem, 1.5vw, 1rem) clamp(1rem, 2vw, 2.5rem)",
    fontSize: "clamp(0.85rem, 1vw, 1rem)",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s",
    minHeight: "44px",
    minWidth: "44px",
    touchAction: "manipulation",
  };

  const noResultsStyle = {
    textAlign: "center",
    padding: "3rem",
    color: "#555",
    fontSize: "1.1rem",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: window.innerWidth <= 768 ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "clamp(1rem, 2vw, 1.5rem)",
    marginTop: "clamp(1rem, 2vw, 2rem)",
  };

  const citationStyle = (categoryColor) => ({
    background: "#f8f9fa",
    padding: "1rem",
    borderRadius: "5px",
    marginTop: "1.5rem",
    borderLeft: `4px solid ${categoryColor}`,
    fontSize: "0.9rem",
    color: "#333",
    fontStyle: "italic",
    lineHeight: "1.6",
  });

  const sourceStyle = {
    color: "#555",
    marginTop: "1rem",
    fontSize: "0.95rem",
  };

  const citationLabelStyle = (categoryColor) => ({
    fontWeight: "600",
    fontStyle: "normal",
    color: categoryColor,
    marginBottom: "0.5rem",
  });

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

  const adminSectionContainerStyle = {
    marginTop: "2rem",
    padding: "1.5rem",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
  };

  const adminToggleButtonStyle = {
    padding: "0.6rem 1.2rem",
    borderRadius: "999px",
    border: "1px solid #1e293b",
    background: "white",
    color: "#1e293b",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "1rem",
  };

  const adminInputStyle = {
    width: "100%",
    padding: "0.6rem 0.8rem",
    borderRadius: "6px",
    border: "1px solid #d1d5db",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  };

  const adminLabelStyle = {
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#374151",
    marginTop: "0.75rem",
    display: "block",
  };

  const adminSubmitButtonStyle = {
    marginTop: "1rem",
    padding: "0.7rem 1.5rem",
    background: "#1e293b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: 600,
    cursor: "pointer",
    fontSize: "0.9rem",
  };

  const adminStatusStyle = (type) => ({
    marginTop: "0.75rem",
    fontSize: "0.85rem",
    color: type === "error" ? "#b91c1c" : "#166534",
  });

  // No admin login required anymore

  const handleUploadChange = (field, value) => {
    setUploadForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    setUploadError("");
    setUploadSuccess("");

    if (!uploadForm.name || !uploadForm.description || !uploadForm.url) {
      setUploadError("Dataset name, description, and URL are required.");
      return;
    }

    const formData = new FormData();
    formData.append("dataset_name", uploadForm.name);
    formData.append("dataset_description", uploadForm.description);
    formData.append("dataset_source", uploadForm.source);
    formData.append("input_features", uploadForm.features);
    formData.append("dataset_url", uploadForm.url);

    try {
      setUploading(true);
      const res = await fetch(`${API_URL}/admin/upload-dataset`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setUploadError(data.error || "Failed to upload dataset.");
        return;
      }

      // Do not modify the current dataset list on this page; 
      // submissions are stored for review only and do not
      // affect what is shown above.
      setUploadSuccess("Thank you. Your response has been recorded for review.");
      setUploadForm({ name: "", description: "", source: "", features: "", url: "" });
    } catch (err) {
      console.error(err);
      setUploadError("Unexpected error while uploading dataset.");
    } finally {
      setUploading(false);
    }
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

      <div style={adminSectionContainerStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "1.1rem" }}>Share a Dataset With the Team</h2>
            <p style={{ margin: "0.25rem 0", fontSize: "0.85rem", color: "#6b7280" }}>
              Use this form to send us dataset details (by URL).
            </p>
          </div>
          <button
            type="button"
            style={adminToggleButtonStyle}
            onClick={() => setShowUploadForm((prev) => !prev)}
          >
            {showUploadForm ? "Hide Form" : "Open Form"}
          </button>
        </div>

        {showUploadForm && (
          <div style={{ marginTop: "1rem" }}>
            <form onSubmit={handleUploadSubmit} style={{ marginTop: "1.0rem" }}>
                <label style={adminLabelStyle}>
                  Dataset Name
                  <input
                    type="text"
                    placeholder="e.g., Custom SOC Drive Cycle Dataset"
                    style={adminInputStyle}
                    value={uploadForm.name}
                    onChange={(e) => handleUploadChange("name", e.target.value)}
                  />
                </label>

                <label style={adminLabelStyle}>
                  Dataset Description
                  <textarea
                    placeholder="Short description of the dataset and its purpose"
                    style={{ ...adminInputStyle, minHeight: "80px", resize: "vertical" }}
                    value={uploadForm.description}
                    onChange={(e) => handleUploadChange("description", e.target.value)}
                  />
                </label>

                <label style={adminLabelStyle}>
                  Citation / Source (optional)
                  <textarea
                    placeholder="Citation, DOI, or source link"
                    style={{ ...adminInputStyle, minHeight: "60px", resize: "vertical" }}
                    value={uploadForm.source}
                    onChange={(e) => handleUploadChange("source", e.target.value)}
                  />
                </label>

                <label style={adminLabelStyle}>
                  Input Features (optional)
                  <textarea
                    placeholder="List the key input features used in this dataset (e.g., voltage, temperature, cycle count)"
                    style={{ ...adminInputStyle, minHeight: "60px", resize: "vertical" }}
                    value={uploadForm.features}
                    onChange={(e) => handleUploadChange("features", e.target.value)}
                  />
                </label>

                <label style={adminLabelStyle}>
                  Dataset URL (Google Drive, etc.)
                  <input
                    type="url"
                    placeholder="Paste a shareable link to the dataset"
                    style={adminInputStyle}
                    value={uploadForm.url}
                    onChange={(e) => handleUploadChange("url", e.target.value)}
                  />
                </label>

                <button type="submit" style={adminSubmitButtonStyle} disabled={uploading}>
                  {uploading ? "Uploading..." : "Upload Dataset"}
                </button>

                {uploadError && <div style={adminStatusStyle("error")}>{uploadError}</div>}
                {uploadSuccess && <div style={adminStatusStyle("success")}>{uploadSuccess}</div>}
              </form>
          </div>
        )}
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
          {filteredDatasets.map((d, i) => {
            const categoryColor = getCategoryColor(d.dataset_name);
            return (
            <div 
              key={i} 
              style={getCardStyle(d.dataset_name)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = categoryColor;
                e.currentTarget.style.boxShadow = `0 4px 12px ${categoryColor}40`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#ddd";
                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
            <h3 style={{ color: categoryColor }}>{d.dataset_name}</h3>
            <p style={{color: "#555", marginTop: "1rem", lineHeight: "1.8"}}>
              {d.dataset_description}
            </p>
            
            {d.dataset_source && (
              <div style={citationStyle(categoryColor)}>
                <div style={citationLabelStyle(categoryColor)}>📚 Citation:</div>
                {d.dataset_source.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
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
              style={{...buttonStyle, background: categoryColor}}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
            >
              Download Dataset
            </a>
            </div>
          );
          })}
        </div>
      )}
    </div>
  );
}

export default Datasets;
