const express = require('express');
const { fetchPredictions, fetchDetails } = require('../controllers/placesController');

const router = express.Router();

// Route for fetching predictions
router.get('/autocomplete', fetchPredictions);
router.get('/get-details', fetchDetails);

module.exports = router;
