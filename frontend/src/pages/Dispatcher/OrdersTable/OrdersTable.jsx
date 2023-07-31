import React from 'react';
import styles from './OrdersTable.module.scss';
import { useDispatcherContext } from '../DispatcherContext';
import { ORDERS_NAMES } from '../../../helpers/dictionaries';
import cx from 'classnames';

const OrdersTable = () => {
  const { ordersAll, isLoadingOrders } = useDispatcherContext();

  return (
    <>
      <div className={styles.orders_table}>
        <table>
          <thead>
            <tr>
              <th className={styles.orders_id}>Номер заказа</th>
              <th className={styles.orders_name}>Имя клиента</th>
              <th className={styles.orders_phone}>Телефон клиента</th>
              <th>Адрес</th>
              <th className={styles.orders_status}>Статус заказа</th>
            </tr>
          </thead>
          <tbody>
            {isLoadingOrders ? (
              <tr>
                <td>Заказы не загружены</td>
              </tr>
            ) : (
              ordersAll.map((orderItem, index) => (
                <tr
                  key={index}
                  className={
                    orderItem.status === 'new' ? styles.orders_status__new : ''
                  }>
                  <td className={styles.orders_id}>{orderItem.id}</td>
                  <td className={styles.orders_name}>{orderItem.name}</td>
                  <td className={styles.orders_phone}>{orderItem.phone}</td>
                  <td className={styles.orders_address}>{orderItem.address}</td>
                  <td className={cx(styles.orders_status)}>
                    {ORDERS_NAMES[orderItem.status]}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default OrdersTable;
