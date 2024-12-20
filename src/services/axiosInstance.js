import axios from "axios";

export const API = axios.create({ baseURL: `https://hr.ncaa.gov.ng/old_hr/apis/` });
API.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem('memo-auth-session'))
    ?.state?.userData?.token;

  req.headers['token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});


export const AUTH_API = axios.create({ baseURL: `https://hrnew.creditclan.com/index.php/` }); //https://hrnew.creditclan.com/api/index.php/
AUTH_API.interceptors.request.use((req) => {

  // const token = JSON.parse(localStorage.getItem('memo-auth-session'))
  //   ?.state?.userData?.token;

  // req.headers['Token'] = token || '';
  req.headers['Content-type'] = 'application/json';
  req.headers['Accept'] = 'application/json';
  return req;
});