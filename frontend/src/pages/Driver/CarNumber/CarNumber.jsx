import React from 'react';
import styles from './CarNumber.module.scss';
import { useDriverContext } from '../DriverContext';

const CarNumber = () => {
  const { carNumber } = useDriverContext();

  return (
    <div>
      <p className={styles.car_number}>{carNumber}</p>
    </div>
  );
};

export default CarNumber;
