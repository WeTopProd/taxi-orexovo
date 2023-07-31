import React, { useState } from 'react';
import styles from './DriverPopup.module.scss';
import {
  completeOrderByDriver,
  refuseOrderByDriver,
  takeOrderByDriver,
} from '../../../services/userService';
import cx from 'classnames';

const DriverPopup = ({ address, orderId, orderStatus, setDriverStatus }) => {
  const [isRefusedOrder, setIsRefusedOrder] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [orderStatusLocal, setOrderStatusLocal] = useState(orderStatus);

  // const audio = new Audio(soundNewOrder);
  // if (orderStatus === 'assigned') audio.play();

  const onClickTakeOrder = (orderId) => {
    return takeOrderByDriver(orderId)
      .then((res) => alert(res.data.message))
      .then(() => {
        setOrderStatusLocal('confirmed');
        setDriverStatus('busy');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickCompleteOrder = (orderId) => {
    return completeOrderByDriver(orderId)
      .then(() => {
        setOrderStatusLocal('complete');
        setDriverStatus('free');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitRefuseOrder = (e) => {
    e.preventDefault();
    // clearForm();
    refuseOrderByDriver(orderId, textAreaValue)
      .then(() => {
        setIsRefusedOrder(false);
        setOrderStatusLocal('new');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {orderStatusLocal === 'complete' || orderStatusLocal === 'new' ? (
        ''
      ) : (
        <div className={styles.driver_popup}>
          <h3>Заказ N{orderId}</h3>
          {isRefusedOrder === false ? (
            <>
              <p>
                <b>Адрес:</b>
                <br />
                <br /> {address}
              </p>
              <div className={styles.btns}>
                {orderStatusLocal === 'confirmed' ? (
                  <button
                    onClick={() => onClickCompleteOrder(orderId)}
                    className={styles.btn}>
                    Завершить заказ
                  </button>
                ) : (
                  <button
                    onClick={() => onClickTakeOrder(orderId)}
                    className={styles.btn}>
                    Подтвердить заказ
                  </button>
                )}
                <button
                  onClick={() => setIsRefusedOrder(true)}
                  className={cx(styles.btn, styles.btn_reject)}>
                  Отклонить
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={onSubmitRefuseOrder}>
                <textarea
                  value={textAreaValue}
                  onChange={(e) => setTextAreaValue(e.target.value)}
                  rows={5}
                  className={styles.textarea}
                  maxLength={1000}
                  required={true}>
                  Введите причину отказа
                </textarea>
                <div className={styles.btns}>
                  <button
                    type={'submit'}
                    className={cx(styles.btn, styles.btn_reject)}>
                    Отказаться
                  </button>
                  <button
                    onClick={() => setIsRefusedOrder(false)}
                    className={styles.btn}>
                    Назад
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default DriverPopup;
