
import axios from 'axios';

export const FETCH_POST = 'FETCH_POST';
const API_KEY = 'aae03438703d923b16d2e4823ed65d7e';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export function fetchPost() {
  var city = 'irvine';
  const url = `${ROOT_URL}&q=${city},us`;
  const request = axios.get(url);
  console.log(' i am in the action folder');
  console.log(request);


  return {
    type: FETCH_POST,
    payload: request
  };
}