const BASE_URL = "api.odcloud.kr/api";
const PARAM1 = "/15096724/v1/uddi:36cb1fd9-84cc-476b-a502-bb17804d8613";
const SERVICEKEY =
  "SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN%2BpX3EeI49A%3D%3D";

export function fetcher() {
  return fetch(
    "https://api.odcloud.kr/api/15096724/v1/uddi:36cb1fd9-84cc-476b-a502-bb17804d8613?serviceKey=SKyFFJUUiEqNgxwXDES6CgAtpZbzDm5VSOOchabfhloEfPdFje2y0PmEGdoggoE3mBY3dHKBfSrN%2BpX3EeI49A%3D%3D"
  ).then((response) => response.json());
}
