const { getAutocompletePredictions, getPlaceDetails } = require('../services/placesServices');

exports.fetchPredictions = async (req, res) => {
  const { input } = req.query; // Get input from query params
  const apiKey = process.env.PLACES_API_KEY;
  const sessionToken = process.env.SESSION_TOKEN;

  if (!input) {
    return res.status(400).json({ error: 'Input parameter is required' });
  }

  try {
    const predictions = await getAutocompletePredictions(input, apiKey, sessionToken);
    res.status(200).json({ predictions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.fetchDetails = async (req, res) => {
  const { placeId } = req.query; // Get placeId from query params
  const apiKey = process.env.PLACES_API_KEY;
  const sessionToken = process.env.SESSION_TOKEN;

  if (!placeId) { 
    return res.status(400).json({ error: 'PlaceId parameter is required' });
  }

  try {
    const details = await getPlaceDetails(placeId, apiKey, sessionToken);
    res.status(200).json({ details });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}