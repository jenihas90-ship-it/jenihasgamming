import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// In-memory mock database for Vercel deployment (avoids sqlite3 binary issues)
let businesses = [
  { id: 1, name: "Addis Tech Solutions", identifier: "TIN123456", trust_score: 95, status: "Excellent", verified: true },
  { id: 2, name: "Ethio Trading Co", identifier: "0911234567", trust_score: 40, status: "Suspicious", verified: false },
  { id: 3, name: "Safeway Logistics", identifier: "TIN987654", trust_score: 82, status: "Good", verified: true }
];

let reports = [
  { id: 1, business_identifier: "forex trading", description: "Known cryptocurrency scam asking for deposits via Telegram.", city: "Addis Ababa", type: "Scam", created_at: new Date() }
];

// Verify Endpoint
app.get('/api/verify', (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  const q = query.toLowerCase();
  const results = businesses.filter(b => b.name.toLowerCase().includes(q) || b.identifier.toLowerCase() === q);

  const queryReports = reports.filter(r => r.business_identifier.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));

  res.json({ results, reports: queryReports });
});

// Report Endpoint
app.post('/api/report', (req, res) => {
  const { identifier, description, city, type } = req.body;

  if (!identifier || !description) {
    return res.status(400).json({ error: 'Identifier and description are required' });
  }

  reports.push({ id: reports.length + 1, business_identifier: identifier, description, city: city || 'Unknown', type: type || 'Report', created_at: new Date() });

  // Decrease trust score slightly upon report
  const bizIndex = businesses.findIndex(b => b.identifier === identifier);
  if (bizIndex !== -1) {
    businesses[bizIndex].trust_score = Math.max(0, businesses[bizIndex].trust_score - 5);
  }

  res.json({ message: 'Report submitted successfully', id: reports.length });
});

// AI Analysis Endpoint (Simulated)
app.post('/api/analyze', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'Text is required' });

  const lowercaseText = text.toLowerCase();

  // Risk Keywords
  const highRisk = ["crypto", "urgent", "password", "deposit", "western union", "telegram", "investment", "guaranteed", "double", "returns", "forex", "binary", "lottery", "winner", "fee"];
  const lowRisk = ["receipt", "invoice", "meeting", "delivery", "schedule", "hello", "appointment", "official"];

  let score = 20; // Default base risk
  let detectedFlags = [];

  highRisk.forEach(word => {
    if (lowercaseText.includes(word)) {
      score += 15;
      if (!detectedFlags.includes(`Suspicious keyword: "${word}"`)) {
        detectedFlags.push(`Suspicious keyword: "${word}"`);
      }
    }
  });

  lowRisk.forEach(word => {
    if (lowercaseText.includes(word)) {
      score -= 5;
    }
  });

  score = Math.min(100, Math.max(0, score)); // Clamp between 0 and 100

  let status = "Low Risk. Seems Safe.";
  let color = "var(--accent-emerald)";
  if (score > 70) {
    status = "High Risk! Potential Scam Detected.";
    color = "var(--accent-crimson)";
  } else if (score > 40) {
    status = "Medium Risk. Proceed with caution.";
    color = "#FFD166";
  }

  res.json({ score, status, color, flags: detectedFlags });
});

// Start local server if not running in Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
export default app;
