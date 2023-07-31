import axios from 'axios';
import { getToken } from './localStorageService';
import { routes } from '../helpers/routes';

export const HOST = process.env.REACT_APP_API_URL;

export const $api = axios.create({
  baseURL: HOST,
});

$api.interceptors.request.use((config) => {
  config.headers['authorization'] = `Token ${getToken()}`;
  return config;
});

$api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      alert(
        'Нужно залогиниться. Вы сейчас будете перенаправлены на страницу авторизации',
      );
      window.location.assign(routes.login);
    }
    return Promise.reject(error);
  },
);
