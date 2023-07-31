import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { $api, HOST } from './api';

const BASE_URL_DRIVERS = `/users/`;
const BASE_URL_TAKE_ORDER = `/take-order/`;
const BASE_URL_REFUSE_ORDER = `/refuse-order/`;
const BASE_URL_COMPLETE_ORDER = `/complete-order/`;
const BASE_URL_DRIVERS_W_HOST = `${HOST}/users/`;

export const submitAddCar = (data) => axios.post(BASE_URL_DRIVERS_W_HOST, data);

const filterUserByType = (obj) => obj.user_type === 'driver';

export const fetchCars = () =>
  $api
    .get(BASE_URL_DRIVERS)
    .then((response) => response?.data.filter(filterUserByType));

export const QueryCars = (time) =>
  useQuery({
    queryFn: () => fetchCars(),
    queryKey: ['cars'],
    refetchInterval: time,
    retry: 5,
    onError: (error) => {
      alert(error);
    },
  });

export const getUserInfoByToken = () => $api.get(`${BASE_URL_DRIVERS}me/`);
export const changeDriverDataQuery = (data, carId) =>
  $api.patch(BASE_URL_DRIVERS + `${carId}/`, data);
export const takeOrderByDriver = (orderId) =>
  $api.post(BASE_URL_TAKE_ORDER + `${orderId}/`);
export const refuseOrderByDriver = (orderId, comment) =>
  $api.post(BASE_URL_REFUSE_ORDER + `${orderId}/`, { comment: comment });
export const completeOrderByDriver = (orderId) =>
  $api.post(BASE_URL_COMPLETE_ORDER + `${orderId}/`);
