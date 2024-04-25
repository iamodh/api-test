const BASE_URL = "http://apis.data.go.kr/1360000/BeachInfoservice";
const API_KEY1 =
  "SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN%2BpX3EeI49A%3D%3D ";
const API_KEY2 =
  "SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN+pX3EeI49A==";
const DATATYPE = "JSON";
const BEACHID = ["304", "305", "306", "307", "308", "309"]; // 해운대, 송정, 광안리, 임랑, 다대포, 일광
const numOfRows = 10;
/* Get date */
const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset);
console.log(today.toISOString()); // 2024-04-24T12:38:37.603Z
const BASE_DATE = today.toISOString().substring(0, 10).replaceAll("-", ""); // 20240424
const BASE_TIME = today.toISOString().substring(11, 16).replaceAll(":", ""); // 1238

const SEARCHTIME = BASE_DATE + BASE_TIME;

/* Info Params */
// 단기예보조회
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: base_date, base_time, beach_num
const FORECAST = "/getVilageFcstBeach";

// 해수욕장 수온조회
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: search_time, beach_num
const WATERTEMP = "/getTwBuoyBeach";

// 해수욕장 일출일몰조회
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: base_date, beach_num
const SUNINFO = "/getSunInfoBeach";

// 해수욕장 조석정보 (6-8월 이용 가능)
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: base_date, beach_num
const TIDEINFO = "/getTideInfoBeach";

// 해수욕장 파고조회
// fixed params: serviceKey, dataType, numOfRows,
// non-fixed params: search_time, beach_num
const WAVEHEIGHT = "/getWhBuoyBeach";

export function getBeachWeather() {
  return fetch();
}
