import React, { useRef, useState } from 'react';
import styles from './Car.module.scss';
import carBusyIMG from '../../../assets/img/car_busy.png';
import carFreeIMG from '../../../assets/img/car_free.png';
import cx from 'classnames';
import { STATUS_CAR_NAMES } from '../../../helpers/dictionaries';
import { useDispatcherContext } from '../DispatcherContext';
import { useOnClickOutside } from '../../../helpers/hooks';
import { orderAssignRequest } from '../../../services/orderService';

const Car = ({ driverId, driverName, driverPhone, carNumber, status }) => {
  const [carPopupIsOpen, setCarPopupIsOpen] = useState(false);
  const { ordersAll } = useDispatcherContext();

  const popupOrdersRef = useRef(null);
  const openNewOrdersRef = useRef(null);

  useOnClickOutside(popupOrdersRef, openNewOrdersRef, () =>
    setCarPopupIsOpen(false),
  );

  const handlerClickOrder = (orderId, driverId) => {
    orderAssignRequest(orderId, driverId).then((res) =>
      alert(res.data.message),
    );
  };

  const orderFilterByNew = (orders) => orders.status === 'new';
  const ordersFilter = ordersAll.filter(orderFilterByNew);

  return (
    <div
      ref={openNewOrdersRef}
      onClick={() => setCarPopupIsOpen(!carPopupIsOpen)}
      className={styles.car}>
      {carPopupIsOpen && status === 'free' ? (
        <div ref={popupOrdersRef} className={styles.carPopup}>
          <h3 className={styles.carPopup_title}>Назначить заказ</h3>
          <ul className={styles.carPopup_list}>
            {ordersFilter.map((order, index) => (
              <li
                onClick={() => handlerClickOrder(order.id, driverId)}
                className={styles.carPopup_item}
                key={index}>
                {order.id}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ''
      )}
      <div className={styles.image}>
        <h3 className={styles.title}>Автомобиль</h3>
        <img
          src={status === 'free' ? carFreeIMG : carBusyIMG}
          width="85"
          height="64"
          alt="такси"
        />
        <p className={styles.number}>{carNumber}</p>
      </div>

      <div>
        <h3 className={styles.title}>Имя</h3>
        <p className={styles.text}>{driverName}</p>
        <h3 className={styles.title}>Телефон</h3>
        <p className={styles.text}>{driverPhone}</p>
        <h3 className={styles.title}>Статус</h3>
        <p className={styles.text}>
          <span
            className={cx(
              styles.status,
              status === 'free' ? styles.status_free : '',
            )}></span>
          <b>{STATUS_CAR_NAMES[status]}</b>
        </p>
      </div>
    </div>
  );
};

export default Car;
