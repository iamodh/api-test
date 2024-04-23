import { Link } from "react-router-dom";
import { getWeather } from "../libs/getWeather";
import { useQuery } from "react-query";

export default function Weather() {
  const { isLoading, data } = useQuery(["weatherInfo"], getWeather);

  return (
    <>
      <header>
        <h1>Weather</h1>
        <Link to="/">Home</Link>
      </header>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          />
          <p>{JSON.stringify(data)}</p>
        </>
      )}
    </>
  );
}
