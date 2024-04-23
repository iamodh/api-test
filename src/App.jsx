import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Weather from "./Weather";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/weather" element={<Weather />} />
    </Routes>
  );
}
