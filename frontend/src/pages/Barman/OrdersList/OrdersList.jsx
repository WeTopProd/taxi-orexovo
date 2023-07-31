import React from 'react';
import Order from '../Order/Order';
import styles from './OrdersList.module.scss';

const OrdersList = ({ orders }) => {
  return (
    <ul className={styles.orders_list}>
      {orders.map((order, index) => {
        return (
          <li className={styles.orders_item} key={index}>
            <Order order={order} />
          </li>
        );
      })}
    </ul>
  );
};

export default OrdersList;
