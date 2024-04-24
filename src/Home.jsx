import { useQuery } from "react-query";
import { useEffect } from "react";
import { getBusinessLists } from "../libs/getBusinessLists";
import { Link } from "react-router-dom";
import getBusiness from "../libs/getBusiness";

export default function Home() {
  const { isLoading, data, isError, error } = useQuery(
    ["businessLists"],
    getBusinessLists
  );
  // useEffect(() => {
  //   // use effect를 활용하여 fetch가 끝나면 받아온 데이터를 db table schema에 맞추어 가공 및 insert
  //   if (!isLoading && !isError && data) {
  //     const saveData = data.data
  //       .filter((list) => list["카테고리명"] === "레저/체육/공원")
  //       .filter((list) => list["도로명"])
  //       .filter((list) => list["전화번호"])
  //       .map((item) => ({
  //         business_name: item.업체명,
  //         business_address: item.도로명,
  //         business_contact: item.전화번호,
  //         is_open: item.폐업여부 === "N" ? "true" : "false",
  //         is_home: item.홈페이지주소 ? "true" : "false",
  //       }));
  //     console.log(saveData);
  //     getBusiness(saveData);
  //   }
  // }, [data, isLoading, isError]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
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
