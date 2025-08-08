const express = require('express');
const axios = require('axios');
const { submitSchema } = require('../validators/submitValidator');

const router = express.Router();

// Replace with your actual external endpoint
const SUPERVISOR_SOURCE_URL = process.env.SUPERVISOR_SOURCE_URL || 'https://o3m5qixdng.execute-api.us-east-1.amazonaws.com/api/managers';

// GET /api/supervisors
router.get('/supervisors', async (req, res) => {
  try {
    const response = await axios.get(SUPERVISOR_SOURCE_URL);
    const supervisors = response.data;

    const filtered = supervisors
      .filter(s => isNaN(s.jurisdiction)) // Remove numeric jurisdictions
      .sort((a, b) => {
        const jA = a.jurisdiction.toLowerCase();
        const jB = b.jurisdiction.toLowerCase();
        const lA = a.lastName.toLowerCase();
        const lB = b.lastName.toLowerCase();
        const fA = a.firstName.toLowerCase();
        const fB = b.firstName.toLowerCase();

        return jA.localeCompare(jB) || lA.localeCompare(lB) || fA.localeCompare(fB);
      })
      .map(s => `${s.jurisdiction} - ${s.lastName}, ${s.firstName}`);

    res.json(filtered);
  } catch (error) {
    console.error('Error fetching supervisors:', error.message);
    res.status(500).json({ error: 'Failed to load supervisors' });
  }
});

// POST /api/submit (unchanged)
router.post('/submit', (req, res) => {
  const { error, value } = submitSchema.validate(req.body);
  
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  console.log('Submission received:', value);
  res.status(200).json({ message: 'Submission successful.' });
});

module.exports = router;
