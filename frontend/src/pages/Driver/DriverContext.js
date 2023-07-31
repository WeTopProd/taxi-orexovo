import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchOrdersByDriver } from '../../services/orderService';
import { useQuery } from '@tanstack/react-query';
import { getUserInfoByToken } from '../../services/userService';

const initialValue = {
  driverOrders: [],
  isLoading: true,
  carsList: [],
  isLoadingCars: true,
};

const Context = createContext(initialValue);

export const DriverProvider = ({ children }) => {
  const [carId, setCarId] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [driverStatus, setDriverStatus] = useState('busy');

  const { data: driverOrders = [] } = useQuery({
    queryFn: () => fetchOrdersByDriver(carId).then((res) => res.data.results),
    queryKey: [carId],
    refetchInterval: 5000,
    retry: 5,
    onError: (error) => {
      console.error(error);
    },
  });

  useEffect(() => {
    getUserInfoByToken()
      .then((res) => {
        setCarId(res.data.id);
        setCarNumber(res.data.car_number);
        setDriverName(res.data.first_name);
        setDriverPhone(res.data.phone);
        setDriverStatus(res.data.status);
      })
      .catch((err) => {
        alert('Ошибка получения данных');
        console.log(err);
      });
  }, []);

  return (
    <Context.Provider
      value={{
        driverOrders,
        carId,
        setCarId,
        carNumber,
        setCarNumber,
        driverName,
        setDriverName,
        driverPhone,
        driverStatus,
        setDriverStatus,
      }}>
      {children}
    </Context.Provider>
  );
};

export const useDriverContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw Error('No Driver context found.');
  }

  return context;
};
