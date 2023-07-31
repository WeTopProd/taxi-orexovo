import React, { createContext, useContext, useState } from 'react';
import { QueryCars } from '../../services/userService';

const initialValue = {
  address: '',
  setAddress: () => undefined,
  price: '',
  setPrice: () => undefined,
  carsFreeCount: 0,
};

const Context = createContext(initialValue);

export const BarmanProvider = ({ children }) => {
  const [address, setAddress] = useState(initialValue.address);
  const [price, setPrice] = useState('');

  const { data: carsFreeList = [] } = QueryCars(3000);

  return (
    <Context.Provider
      value={{ address, setAddress, price, setPrice, carsFreeList }}>
      {children}
    </Context.Provider>
  );
};

export const useBarmanContext = () => {
  const context = useContext(Context);

  if (!context) {
    throw Error('No Barman context found.');
  }

  return context;
};
