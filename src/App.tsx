import React from "react";
import { Routes, Route } from "react-router-dom";
import CountryInfo from "./CountryInfo";
import WeatherInfo from "./WeatherInfo";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/countryInfo" element={<CountryInfo />} />
      <Route path="/weatherInfo" element={<WeatherInfo />} />
    </Routes>
  );
}

export default App;
