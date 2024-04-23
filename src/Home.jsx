import { useQuery } from "react-query";
import { getBusinessLists } from "../libs/getBusinessLists";
import { Link } from "react-router-dom";

export default function Home() {
  const { isLoading, data } = useQuery(["businessLists"], getBusinessLists);
  return (
    <>
      <header>
        <h1>DATA</h1>
        <Link to="/weather">Weather</Link>
      </header>
      {isLoading ? (
        "Loading..."
      ) : (
        <ul>
          {data.data
            .filter((list) => list["카테고리명"] === "레저/체육/공원")
            .filter((list) => list["도로명"])
            .filter((list) => list["전화번호"])
            .map((list, index) => (
              <li key={index}>
                {index} {list["업체명"]} {list["도로명"]} {list["전화번호"]}
                {list["폐업여부"]} {list["홈페이지"] ? "홈" : "노홈"}
              </li>
            ))}
        </ul>
      )}
    </>
  );
}
