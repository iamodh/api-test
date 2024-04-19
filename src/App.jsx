import { useQuery } from "react-query";
import { fetcher } from "./assets/libs/api";

function App() {
  const { isLoading, data } = useQuery("test", fetcher);
  <h1>HI</h1>;
  return <>{isLoading ? "Loading..." : <p>{JSON.stringify(data)}</p>}</>;
}

export default App;
