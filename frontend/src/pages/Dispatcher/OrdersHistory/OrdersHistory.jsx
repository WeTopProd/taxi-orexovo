import React, { useEffect, useRef, useState } from 'react';
import styles from './OrdersHistory.module.scss';
import cx from 'classnames';
import { useOnClickOutside } from '../../../helpers/hooks';
import { ORDERS_NAMES } from '../../../helpers/dictionaries';
import { fetchOrdersByPage } from '../../../services/orderService';

const OrdersHistory = () => {
  const [isOpenOrders, setIsOpenOrders] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [orders, setOrders] = useState([]);

  const ordersRef = useRef(null);
  const btnRef = useRef(null);

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ordersRef, btnRef, () => setIsOpenOrders(false));

  const fetchOrderList = (page) => {
    setIsLoading(true);

    fetchOrdersByPage(page)
      .then((data) => {
        setPrevPage(data?.data.previous);
        setNextPage(data?.data.next);
        setOrders(data?.data.results);
      })
      .then(() => setIsLoading(false))
      .catch((error) => {
        alert(error);
      });
  };

  const onClickOrdersHandler = () => {
    if (isOpenOrders) {
      fetchOrderList();
    }
    setIsOpenOrders(!isOpenOrders);
    setPage(1);
  };

  useEffect(() => {
    fetchOrderList(page);
  }, [page]);

  return (
    <>
      <button
        ref={btnRef}
        className={cx(styles.btn, isOpenOrders ? styles.active : '')}
        onClick={onClickOrdersHandler}>
        История заказов
      </button>
      {isOpenOrders && (
        <div ref={ordersRef} className={styles.orders_popup}>
          <div className={styles.orders_list}>
            <table>
              <thead>
                <tr>
                  <th className={styles.orders_id}>Номер заказа</th>
                  <th className={styles.orders_name}>Имя клиента</th>
                  <th className={styles.orders_phone}>Телефон клиента</th>
                  <th className={styles.orders_status}>Статус заказа</th>
                </tr>
              </thead>
            </table>
            <div className={styles.orders_list_scroll}>
              <table>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td>Данные загружаются</td>
                    </tr>
                  ) : (
                    orders.map((orderItem, index) => (
                      <tr key={index}>
                        <td className={styles.orders_id}>{orderItem.id}</td>
                        <td className={styles.orders_name}>{orderItem.name}</td>
                        <td className={styles.orders_phone}>
                          {orderItem.phone}
                        </td>
                        <td className={styles.orders_status}>
                          {ORDERS_NAMES[orderItem.status]}
                        </td>
                      </tr>
                    ))
                  )}
                  <tr>
                    <td className={styles.btns} colSpan={4}>
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={!prevPage}>
                        Предыдущая страница
                      </button>
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={!nextPage}>
                        Следующая страница
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrdersHistory;
