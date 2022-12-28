const axios = require('axios');


export const getPostCodeFromLatLong = async (data) => {
  let resp = [];
  console.log('getPostCodeFromLatLong', data)
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.latitude},${data?.longitude}&key=${process.env.NEXT_PUBLIC_APP_MAPS_KEYS}`,
    )
    .then(async (response) => {
      // handle success
      resp = await response?.data?.results;
     


    })
    .catch(async (error) => {
      // handle error

      // return error;
    })
    .then(function () {
      // always executed
    });
  let convertArray = await [];
  if (resp && resp.length > 0) {
    resp.map((ele) => {
      convertArray.push(ele)
    })
  }
  return convertArray;
};
