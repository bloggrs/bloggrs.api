const express = require('express');
const path = require('path');
const router = express.Router();
const homeRoutes = require('./home');

// Mount routes
router.use('/api/blog-platform', homeRoutes);

module.exports = router; 