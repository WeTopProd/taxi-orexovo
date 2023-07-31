import styles from './Dispatcher.module.scss';
import Header from './Header/Header';
import { useEffect } from 'react';
import changeMeta from '../../helpers/changeMeta';
import OrdersTable from './OrdersTable/OrdersTable';
import { DispatcherProvider } from './DispatcherContext';
import CarsList from './CarsList/CarsList';

const PAGE_TITLE = 'Диспетчер - "БКФ Такси"';
// const PAGE_FAVICON = '/favicon_dispatcher.ico';

function Dispatcher() {
  useEffect(() => changeMeta(PAGE_TITLE), []);

  return (
    <DispatcherProvider>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.cars}>
            <CarsList />
          </div>
          <OrdersTable />
        </main>
      </div>
    </DispatcherProvider>
  );
}

export default Dispatcher;
