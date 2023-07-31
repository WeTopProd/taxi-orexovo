import React from 'react';
import Car from '../Car/Car';
import { useDispatcherContext } from '../DispatcherContext';

const CarsList = () => {
  const { carsList, isLoadingCars } = useDispatcherContext();

  return (
    <>
      {isLoadingCars ? (
        <h3>Идет загрузка</h3>
      ) : (
        carsList.map((car, index) => {
          return (
            <Car
              key={index}
              driverId={car.id}
              driverName={car.first_name}
              driverPhone={car.phone}
              carNumber={car.car_number}
              status={car.status}
            />
          );
        })
      )}
    </>
  );
};

export default CarsList;
