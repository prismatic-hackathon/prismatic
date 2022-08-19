import axios from 'axios';
import L from 'leaflet';

const API_URL = 'https://www.ncei.noaa.gov/cdo-web/api/v2/stations';

const getHistorical = async (coordinates: L.LatLng) => {
  const headers = { token: process.env.REACT_APP_apiKeyNOAAWeather! };
  const lowLat = Math.trunc(coordinates.lat * 10) * 0.1 - 0.2;
  const highLat = Math.trunc(coordinates.lat * 10) * 0.1 + 0.2;
  const lowLong = Math.trunc(coordinates.lng * 10) * 0.1 - 0.2;
  const highLong = Math.trunc(coordinates.lng * 10) * 0.1 + 0.2;
  const bounds = [lowLat, lowLong, highLat, highLong].join(',');
  const params = {
    startdate: '2022-08-01',
    enddate: '2022-08-01',
    datacategoryid: 'TEMP',
    extent: bounds,
  };
  const response = await axios
    .get(API_URL, { params, headers })
    .then((axiosResponse) => {
      return axiosResponse;
    });
  console.log(response.data);
  return response.data.results ? response.data.results[0].id : 'no data';
};

const weatherService = { getHistorical };
export default weatherService;
