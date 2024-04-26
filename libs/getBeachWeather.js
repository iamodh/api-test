const BASE_URL = "http://apis.data.go.kr/1360000/BeachInfoservice";
const API_KEY1 =
  "SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN%2BpX3EeI49A%3D%3D";
const API_KEY2 =
  "SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN+pX3EeI49A==";
const DATA_TYPE = "JSON";
const BEACH_ID = ["304", "305", "306", "307", "308", "309"]; // 해운대, 송정, 광안리, 임랑, 다대포, 일광
const NUM_OF_ROWS = 10;

/* Get date */
const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset);
console.log(today.toISOString()); // 2024-04-24T12:38:37.603Z
const BASE_DATE = today.toISOString().substring(0, 10).replaceAll("-", ""); // 20240424

let BASE_TIME;
const base = ["0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300"];
const time = +today.toISOString().substring(11, 16).replaceAll(":", ""); // 1238 (number)
// 현재 시간에 맞춰 api 제공 BASE_TIME 갱신
base.forEach((base) => {
  if (time > +base) {
    BASE_TIME = base;
  }
});

/* Info Params */
// 단기예보조회
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: base_date, base_time, beach_num
const FORECAST = "/getVilageFcstBeach";
export function getBeachForecast() {
  return fetch(
    `${BASE_URL}${FORECAST}?serviceKey=${API_KEY1}&dataType=${DATA_TYPE}&numOfRows=${NUM_OF_ROWS}&beach_num=304&base_time=${BASE_TIME}&base_date=${BASE_DATE}`
  ).then((response) => response.json());
}

// 해수욕장 수온조회
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: searchTime, beach_num
const WATERTEMP = "/getTwBuoyBeach";
const SEARCHTIME = BASE_DATE + BASE_TIME;

export function getBeachTemp() {
  return fetch(
    `${BASE_URL}${WATERTEMP}?serviceKey=${API_KEY1}&dataType=${DATA_TYPE}&numOfRows=${NUM_OF_ROWS}&beach_num=304&searchTime=${SEARCHTIME}`
  ).then((response) => response.json());
}
