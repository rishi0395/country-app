import { getCountryInfo, getWeatherInfo } from "./api";

test("should call getCountryInfo", async () => {
  expect((await getCountryInfo("val")).status).toBe(200);
});

test("should call getWeatherInfo", async () => {
  expect((await getWeatherInfo("val")).status).toBe(200);
});
