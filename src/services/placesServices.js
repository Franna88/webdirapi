const axios = require('axios');

exports.getAutocompletePredictions = async (input, apiKey, sessionToken) => {
  const baseURL = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  try {
    const response = await axios.get(baseURL, {
      params: {
        input,
        key: apiKey,
        sessiontoken: sessionToken,
        //components: 'country:AO|country:BW|country:SZ|country:LS|country:MW|country:MZ|country:NA|country:ZA|country:ZM|country:ZW',
        components: 'country:ZA'
      },
    });
    return response.data.predictions;
  } catch (error) {
    throw new Error(error.response?.data?.error_message || 'Failed to fetch predictions');
  }
};


exports.getPlaceDetails = async (placeId, apiKey, sessionToken) => {
  const baseURL = 'https://maps.googleapis.com/maps/api/place/details/json';
  try {
    const response = await axios.get(baseURL, {
      params: {
        place_id: placeId,
        key: apiKey,
        sessiontoken: sessionToken,
        fields: 'geometry', // Request only geometry to reduce payload size
      },
    });

    const location = response.data.result?.geometry?.location;

    if (location) {
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error('Location details not found');
    }
  } catch (error) {
    throw new Error(error.response?.data?.error_message || 'Failed to fetch details');
  }
};

