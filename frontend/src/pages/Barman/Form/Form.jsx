import React, { useState } from 'react';
import styles from './Form.module.scss';
import cx from 'classnames';
import { useBarmanContext } from '../BarmanContext';
import { submitOrder } from '../../../services/orderService';

const Form = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { address, setAddress, price, setPrice } = useBarmanContext();

  const clearForm = () => {
    setName('');
    setPhone('');
    setAddress('');
    setPrice('');
  };

  const sendRequest = (data) => {
    submitOrder(data)
      .then(function () {
        alert('Заказ отправлен');
        clearForm();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      name: name,
      phone: phone,
      address: address,
      price: price,
    });
  };

  const onClickPhone = () => {
    setPhone('+7');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={'Имя'}
        name="name"
        id="name"
        required={true}
      />
      <input
        type="tel"
        value={phone}
        onClick={onClickPhone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder={'Телефон'}
        name="phone"
        id="phone"
        required={true}
        autoComplete={'off'}
      />
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder={'Адрес'}
        name="address"
        id="address"
        required={true}
      />
      <input
        className={styles.input_price}
        type="text"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder={'Цена поездки'}
        name="price"
        id="price"
        required={true}
        readOnly={true}
      />
      <div className={styles.form__btns}>
        <button className={styles.btn} type={'submit'}>
          Отправить запрос
        </button>
        <button
          className={cx(styles.btn, styles.btn_reset)}
          type={'reset'}
          onClick={clearForm}>
          Очистить
        </button>
      </div>
    </form>
  );
};

export default Form;
