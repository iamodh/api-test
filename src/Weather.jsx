import { Link } from "react-router-dom";
import { getWeather } from "../libs/getWeather";
import { useQuery } from "react-query";
import { getBeachForecast, getBeachTemp } from "../libs/getBeachWeather";

export default function Weather() {
  const { isLoading: weatherLoading, data: weatherData } = useQuery(
    ["weather", "busan"],
    getWeather
  );
  const { isLoading: beachForecastLoading, data: beachForecastData } = useQuery(
    ["weather", "beachForecast"],
    getBeachForecast
  );
  const { isLoading: beachTempLoading, data: beachTempData } = useQuery(
    ["weather", "beachTemp"],
    getBeachTemp
  );

  return (
    <>
      <header>
        <h1>Weather</h1>
        <Link to="/">Home</Link>
      </header>
      {weatherLoading ? (
        "Loading..."
      ) : (
        <>
          <h2>부산의 날씨</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <p>{JSON.stringify(weatherData)}</p>
        </>
      )}
      {beachForecastLoading ? (
        "Loading..."
      ) : (
        <>
          <h2>해수욕장 단기 예보 (해운대)</h2>
          <p>{JSON.stringify(beachForecastData)}</p>
        </>
      )}
      {beachTempLoading ? (
        "Loading..."
      ) : (
        <>
          <h2>해수욕장 수온</h2>
          <p>{JSON.stringify(beachTempData)}</p>
        </>
      )}
    </>
  );
}
