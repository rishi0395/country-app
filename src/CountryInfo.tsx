import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getWeatherInfo } from "./api";
import { Image, Section } from "./Components";

interface LocationState {
  capital: string;
  population: string;
  flag: string;
  latLng: string;
  [key: string]: string;
}
interface Location {
  state: LocationState;
}

export default function CountryInfo() {
  const location: Location | any = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const locationState: LocationState = location?.state;
  const capital = locationState?.capital;
  const population = locationState?.population;
  const latLng = locationState?.latLng;
  const flag = locationState?.flag;
  useEffect(() => {
    if (!Object.keys(locationState).length) {
      navigate("/");
    }
  }, []);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const weatherInfo = await getWeatherInfo(capital);
      setIsLoading(false);
      if (Object.keys(weatherInfo).length) {
        const { current } = weatherInfo.data;
        const temperature = current.temperature;
        const weather_icons = current.weather_icons[0];
        const wind_speed = current.wind_speed;
        const precip = current.precip;
        navigate("/weatherInfo", {
          state: { temperature, weather_icons, wind_speed, precip },
        });
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };
  return (
    <div style={{ alignItems: "center" }}>
      <Section heading="Capital" text={capital} />
      <Section heading="Population" text={population} />

      {latLng?.length > 0 && (
        <>
          <Section heading="Latitude" text={latLng[0]} />

          <Section heading="Longitude" text={latLng[1]} />
        </>
      )}

      <Image uri={flag} />

      <button onClick={submitHandler}>Click Me</button>

      {isLoading && <div>Loading...</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </div>
  );
}
