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