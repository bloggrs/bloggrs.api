const express = require('express');
const path = require('path');
const router = express.Router();
const HomeProvider = require('../providers/HomeProvider');

// Ensure all required middleware is properly set up
router.use(express.json());

router.get('/home', async (req, res) => {
  try {
    const data = await HomeProvider.getHomeData();
    res.json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 