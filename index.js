// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost/sim_card_db', { useNewUrlParser: true, useUnifiedTopology: true });

// SimCard Schema
const simCardSchema = new mongoose.Schema({
  simNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
  activationDate: { type: Date }
});

const SimCard = mongoose.model('SimCard', simCardSchema);

app.use(bodyParser.json());

// Activate SIM Card
app.post('/activate', async (req, res) => {
  const { simNumber } = req.body;

  if (!simNumber) {
    return res.status(400).json({ error: "SIM number is required" });
  }

  try {
    const simCard = await SimCard.findOne({ simNumber });

    if (!simCard) {
      return res.status(404).json({ error: "SIM card not found" });
    }

    if (simCard.status === 'active') {
      return res.status(400).json({ error: "SIM card is already active" });
    }

    simCard.status = 'active';
    simCard.activationDate = new Date();
    await simCard.save();

    res.json({ message: "SIM card activated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Deactivate SIM Card
app.post('/deactivate', async (req, res) => {
  const { simNumber } = req.body;

  if (!simNumber) {
    return res.status(400).json({ error: "SIM number is required" });
  }

  try {
    const simCard = await SimCard.findOne({ simNumber });

    if (!simCard) {
      return res.status(404).json({ error: "SIM card not found" });
    }

    if (simCard.status === 'inactive') {
      return res.status(400).json({ error: "SIM card is already inactive" });
    }

    simCard.status = 'inactive';
    await simCard.save();

    res.json({ message: "SIM card deactivated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get SIM Details
app.get('/sim-details/:simNumber', async (req, res) => {
  const { simNumber } = req.params;

  try {
    const simCard = await SimCard.findOne({ simNumber });

    if (!simCard) {
      return res.status(404).json({ error: "SIM card not found" });
    }

    res.json({
      simNumber: simCard.simNumber,
      phoneNumber: simCard.phoneNumber,
      status: simCard.status,
      activationDate: simCard.activationDate
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;