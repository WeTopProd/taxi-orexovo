import styles from './Barman.module.scss';
import Header from './Header/Header';
import Form from './Form/Form';
import Map from '../../components/Map/Map';
import React, { useEffect } from 'react';
import changeMeta from '../../helpers/changeMeta';
import { BarmanProvider } from './BarmanContext';
import OrdersList from './OrdersList/OrdersList';
import { useQuery } from '@tanstack/react-query';
import { fetchOrdersByPage } from '../../services/orderService';

const PAGE_TITLE = 'Бармен - "БКФ Такси"';
// const PAGE_FAVICON = '/favicon_barmen.ico';

function Barman() {
  useEffect(() => changeMeta(PAGE_TITLE), []);

  const { data: orders = [] } = useQuery({
    queryFn: () => fetchOrdersByPage().then((res) => res.data?.results),
    queryKey: ['orders'],
    refetchInterval: 3000,
    retry: 5,
    onError: (error) => {
      alert(`Не удалось загрузить список заказов ${error}`);
    },
  });

  return (
    <div className={styles.container_barmen}>
      <BarmanProvider>
        <main className={styles.main}>
          <div className={styles.left}>
            <Header />

            <div className={styles.form}>
              <Form />
            </div>
            <div className={styles.orders_list}>
              {orders.length > 0 ? (
                <OrdersList orders={orders} />
              ) : (
                <span className={styles.no_orders}>Нет заказов</span>
              )}
            </div>
          </div>
          <div className={styles.map}>
            <Map />
          </div>
        </main>
      </BarmanProvider>
    </div>
  );
}

export default Barman;
