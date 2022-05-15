import axios from "axios";

// import {WEATHER_SECRET_KEY} from '@env';
const WEATHER_SECRET_KEY = "48119cd62931bb1e03a0c070200ed50f";

export const weatherApi = (query) =>
  `http://api.weatherstack.com/current?access_key=${WEATHER_SECRET_KEY}&query=${query}`;

export const countryApi = (name) =>
  `https://restcountries.com/v3.1/name/${name}`;

export const getCountryInfo = async (countryName) => {
  const resp = await axios.get(countryApi(countryName));
  return resp;
};

export const getWeatherInfo = async (query) => {
  const resp = await axios.get(weatherApi(query));
  return resp;
};
