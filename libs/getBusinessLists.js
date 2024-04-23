const BASE_URL = "https://api.odcloud.kr/api";
const PARAM1 = "/15096724/v1/uddi:36cb1fd9-84cc-476b-a502-bb17804d8613";
const SERVICE_KEY =
  "SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN%2BpX3EeI49A%3D%3D";
const PAGE = 1;
const PER_PAGE = 525;

export function getBusinessLists() {
  return fetch(
    `${BASE_URL}${PARAM1}?page=${PAGE}}&perPage=${PER_PAGE}&serviceKey=${SERVICE_KEY}`
  ).then((response) => response.json());
}
