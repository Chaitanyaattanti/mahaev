const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from datasets folder
app.use('/files', express.static(path.join(__dirname, 'datasets')));

app.get("/datasets", (req, res) => {
  const sql = `
    SELECT dataset_name, dataset_description, dataset_source, dataset_url
    FROM datasets
    ORDER BY added_at DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.json(result);
    }
  });
});

// Download endpoint for local files
app.get("/download/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, 'datasets', filename);
  
  res.download(filePath, filename, (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(404).json({ error: "File not found" });
    }
  });
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
