import React from 'react';
import styles from './Order.module.scss';
import cx from 'classnames';
import { ORDERS_NAMES } from '../../../helpers/dictionaries';
import { changeOrderStatus } from '../../../services/orderService';

const Order = ({ order }) => {
  const handlerOnClickCancel = (id) => {
    changeOrderStatus(id, 'canceled').then(() => alert('Заказ отменен!'));
  };

  return (
    <div
      className={cx(
        styles.order,
        //todo вынести функцию и сделать через свич
        order.status === 'new'
          ? styles.order_new
          : order.status === 'confirmed'
          ? styles.order_confirmed
          : '',
      )}>
      <p className={styles.order_id}>{order.id}</p>
      <div className={styles.order_info}>
        <p>
          {order.name} ({order.phone})
        </p>
        <p className={styles.order_address}>
          <i>{order.address}</i>
        </p>
      </div>
      <p className={styles.order_status}>{ORDERS_NAMES[order.status]}</p>
      <button
        onClick={() => handlerOnClickCancel(order.id)}
        className={styles.btn_cancel}
        disabled={order.status === 'canceled' || order.status === 'complete'}>
        Отменить
      </button>
    </div>
  );
};

export default Order;
