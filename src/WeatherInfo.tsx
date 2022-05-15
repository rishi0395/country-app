import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Image, Section } from "./Components";

interface LocationState {
  temperature: string;
  wind_speed: string;
  weather_icons: string;
  precip: string;
  [key: string]: string;
}
interface Location {
  state: LocationState;
}

export default function WeatherInfo() {
  const location: Location | any = useLocation();
  const navigate = useNavigate();

  const locationState: LocationState = location?.state;
  const temperature = locationState?.temperature;
  const weather_icons = locationState?.weather_icons;
  const wind_speed = locationState?.wind_speed;
  const precip = locationState?.precip;

  useEffect(() => {
    if (!Object.keys(locationState).length) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Section heading="Temperature" text={temperature} />
      <Section heading="Wind Speed" text={wind_speed} />

      <Image uri={weather_icons} />

      <Section heading="Precip" text={precip} />
    </div>
  );
}
