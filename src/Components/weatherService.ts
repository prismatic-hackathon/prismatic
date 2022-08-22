import axios from 'axios';
import L from 'leaflet';

const API_URL_STATIONS = 'https://www.ncei.noaa.gov/cdo-web/api/v2/stations';

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

  const API_URL_TEMPERATURE = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data';
  const paramsTemperature = {
    startdate: '2022-08-01',
    enddate: '2022-08-01',
    datasetid: 'GHCND',
    units: 'standard',
    datatypeid: 'TOBS',
  };

  const response = await axios
    .get(API_URL_STATIONS, { params, headers })
    .then(async (axiosResponse) => {
      if (axiosResponse?.data.results) {
        const secondResponse = await axios.get(API_URL_TEMPERATURE, {
          params: {
            ...paramsTemperature,
            stationid: axiosResponse.data.results[0].id,
          },
          headers,
        });
        return secondResponse;
      } else {
        return axiosResponse;
      }
    });
  console.log(response.data);
  if (response.data.results) {
    if (response.data.results[0].value) {
      return response.data.results[0].value;
    } else {
      return 'no data';
    }
  } else {
    return 'no data';
  }
};

const weatherService = { getHistorical };
export default weatherService;
