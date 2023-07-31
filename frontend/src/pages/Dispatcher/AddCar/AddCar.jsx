import React, { useRef, useState } from 'react';
import styles from './AddCar.module.scss';
import cx from 'classnames';
import { useOnClickOutside } from '../../../helpers/hooks';
import { submitAddCar } from '../../../services/userService';

const AddCar = () => {
  const [isOpenAddCar, setIsOpenAddCar] = useState(false);

  const [driverPhone, setDriverPhone] = useState('');
  const [driverName, setDriverName] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [driverPassword, setDriverPassword] = useState('');

  const addCarRef = useRef(null);
  const btnRef = useRef(null);

  const onClickAddCarHandler = () => {
    setIsOpenAddCar(!isOpenAddCar);
  };

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(addCarRef, btnRef, () => setIsOpenAddCar(false));

  const clearForm = () => {
    setDriverPhone('');
    setDriverName('');
    setCarNumber('');
    setDriverPassword('');
  };

  const sendRequestAddCar = (data) => {
    submitAddCar(data)
      .then(() => {
        alert('Новая машина добавлена успешно');
        clearForm();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleAddCarSubmit = (e) => {
    e.preventDefault();
    sendRequestAddCar({
      user_type: 'driver',
      phone: driverPhone,
      first_name: driverName,
      car_number: carNumber,
      password: driverPassword,
    });
    setIsOpenAddCar(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        className={cx(styles.btn, isOpenAddCar ? styles.active : '')}
        onClick={onClickAddCarHandler}>
        Добавить автомобиль
      </button>
      {isOpenAddCar && (
        <div ref={addCarRef} className={styles.add_car_popup}>
          <form onSubmit={handleAddCarSubmit}>
            <input
              type="text"
              value={driverPhone}
              onChange={(e) => setDriverPhone(e.target.value)}
              placeholder={'Телефон водителя'}
              name="driver_phone"
              id="driver_phone"
              required={true}
            />
            <input
              type="text"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              placeholder={'Имя водителя'}
              name="driver_name"
              id="driver_name"
              required={true}
            />
            <input
              type="text"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              placeholder={'Гос номер машины'}
              name="car_number"
              id="car_number"
              required={true}
            />
            <input
              type="text"
              value={driverPassword}
              onChange={(e) => setDriverPassword(e.target.value)}
              placeholder={'Пароль'}
              name="driver_password"
              id="driver_password"
              required={true}
            />
            <div className={styles.btns}>
              <button className={styles.btn} type={'submit'}>
                Отправить
              </button>
              <button
                onClick={clearForm}
                className={cx(styles.btn, styles.btn_reset)}
                type={'reset'}>
                Очистить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AddCar;
