import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCountryInfo } from "./api";

export default function Home() {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => setValue(e.target.value);

  const submitHandler = async () => {
    setIsLoading(true);
    try {
      const countryInfo = await getCountryInfo(value);
      setIsLoading(false);
      if (Object.keys(countryInfo).length) {
        const response = countryInfo.data[0];
        const capital = response.capital[0];
        const population = response.population;
        const latLng = response.capitalInfo.latlng;
        const flag = response.flags.png;
        navigate("/countryInfo", {
          state: { capital, population, latLng, flag },
        });
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "centre",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <input
        value={value}
        onChange={handleChange}
        placeholder="Value Controlled Input"
      />
      <button onClick={submitHandler} disabled={!value.length}>
        Click Me
      </button>
      {isLoading && <div>Loading...</div>}
      {errorMessage.length !== 0 && <div>{errorMessage}</div>}
    </div>
  );
}
