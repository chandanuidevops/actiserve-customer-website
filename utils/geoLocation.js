import Geocode from 'react-geocode';
Geocode.setApiKey(process.env);
const axios = require('axios');

export const getLatLng = async (payload) => {
  // Get latitude & longitude from address.
  try {
    const response = await Geocode.fromAddress(payload);
    return response.results[0].geometry.location;
  } catch (e) {
    console.log(e);
  }
};

export const getLocation = async (data) => {
  let resp = [];
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=+${data}+country=UK&key=${process.env.NEXT_PUBLIC_APP_MAPS_KEYS}&libraries=places`,
    )
    .then(async (response) => {
      // handle success
      resp = await response?.data?.results;
      await console.log('asdfsf>>>>getLocation', data);
      // return await res;
    })
    .catch(async (error) => {
      // handle error

      console.log(error);
      // return error;
    })
    .then(function () {
      // always executed
    });
  console.log('asdfsf>>>>getLocation', resp);
  return resp;
};
