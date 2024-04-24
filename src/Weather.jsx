import { Link } from "react-router-dom";
import { getWeather } from "../libs/getWeather";
import { useQuery } from "react-query";

export default function Weather() {
  const { isLoading: weatherLoading, data: weatherData } = useQuery(
    ["weatherInfo"],
    getWeather
  );
  const { isLoading: beachWeatherLoading, data: beachWeatherData } = useQuery(
    ["beachWeatherInfo"],
    getBeachWeather
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
    </>
  );
}
