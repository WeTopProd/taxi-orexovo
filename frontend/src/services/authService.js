import axios from 'axios';
import { $api, HOST } from './api';

const BASE_URL_DRIVER_LOGIN = `${HOST}/auth/token/login/`;
const BASE_URL_DRIVER_LOGOUT = `/auth/token/logout/`;

export function loginQuery(phone, password) {
  return axios.post(BASE_URL_DRIVER_LOGIN, {
    phone: phone,
    password: password,
  });
}

export function logoutQuery() {
  return $api.post(BASE_URL_DRIVER_LOGOUT, {});
}
