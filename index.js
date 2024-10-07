
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sim_card_db';


const SimCard = mongoose.model('SimCard', simCardSchema);

app.use(bodyParser.json());


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