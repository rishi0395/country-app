import React from "react";
import { render, screen } from "@testing-library/react";

import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import { getCountryInfo, getWeatherInfo } from "./api";
import App from "./App";

jest.mock("./api");

test("renders learn react Home", async () => {
  const history = createMemoryHistory();
  getCountryInfo.mockResolvedValue({
    data: [
      {
        capital: ["capital"],
        population: "population",
        capitalInfo: {
          latlng: ["0", "1"],
        },
        flags: { png: "png" },
      },
    ],
  });
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  await act(async () => {
    userEvent.type(
      screen.getByPlaceholderText(/Value Controlled Input/i),
      "India"
    );
  });

  await act(async () => {
    userEvent.click(screen.getByText(/Click Me/i));
  });
});

test("renders learn react Home and click button failure", async () => {
  getCountryInfo.mockRejectedValue({
    message: "errorMessage",
  });
  const history = createMemoryHistory();

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  await act(async () => {
    userEvent.type(
      screen.getByPlaceholderText(/Value Controlled Input/i),
      "India"
    );
  });

  await act(async () => {
    userEvent.click(screen.getByText(/Click Me/i));
  });

  expect(screen.getByText(/errorMessage/i)).toBeInTheDocument();
});

test("landing on countryInfo", () => {
  const history = createMemoryHistory();
  history.push("/countryInfo", {
    capital: "capital",
    population: "population",
    latLng: ["0", "1"],
    flag: "flag",
  });
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
  expect(screen.getByText(/0/i)).toBeInTheDocument();
  expect(screen.getByText(/Click Me/i)).toBeInTheDocument();
});

test("landing on countryInfo without state", () => {
  const history = createMemoryHistory();
  history.push("/countryInfo", {});
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
});

test("landing on countryInfo click on click me", async () => {
  getWeatherInfo.mockResolvedValue({
    data: {
      current: {
        temperature: "temperature",
        weather_icons: ["weather_icons"],
        wind_speed: "wind_speed",
        precip: "precip",
      },
    },
  });
  const history = createMemoryHistory();
  history.push("/countryInfo", {
    capital: "capital",
    population: "population",
    latLng: ["0", "1"],
    flag: { uri: "csd" },
  });
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
  expect(screen.getByText(/0/i)).toBeInTheDocument();
  await act(async () => {
    userEvent.click(screen.getByText(/Click Me/i));
  });
});

test("landing on countryInfo click on click me and api failure", async () => {
  getWeatherInfo.mockRejectedValue({
    message: "errorMessage",
  });
  const history = createMemoryHistory();
  history.push("/countryInfo", {
    capital: "capital",
    population: "population",
    latLng: ["0", "1"],
    flag: "flag",
  });
  act(() => {
    render(
      <Router location={history.location} navigator={history}>
        <App />
      </Router>
    );
  });

  await act(async () => {
    userEvent.click(screen.getByText(/Click Me/i));
  });

  expect(screen.getByText(/errorMessage/i)).toBeInTheDocument();
});

test("landing on weather info", () => {
  const history = createMemoryHistory();
  history.push("/weatherInfo", {
    temperature: "temperature1",
    weather_icons: ["weather_icons"],
    wind_speed: "wind_speed",
    precip: "precip",
    flag: { uri: "flag" },
  });
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  expect(screen.getByText(/temperature1/i)).toBeInTheDocument();
});

test("landing on weather info", () => {
  const history = createMemoryHistory();
  history.push("/weatherInfo", {});
  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );
});
