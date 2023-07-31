import styles from './Driver.module.scss';
import Header from './Header/Header';
import DriverStatus from './DriverStatus/DriverStatus';
import DriverPopup from './DriverPopup/DriverPopup';
import { useEffect } from 'react';
import changeMeta from '../../helpers/changeMeta';
import { DriverProvider, useDriverContext } from './DriverContext';

const PAGE_TITLE = 'Водитель - "БКФ Такси"';
// const PAGE_FAVICON = '/favicon_driver.ico';

function DriverContainer() {
  return (
    <DriverProvider>
      <Driver />
    </DriverProvider>
  );
}

function Driver() {
  const { driverOrders, setDriverStatus } = useDriverContext();

  useEffect(() => {
    changeMeta(PAGE_TITLE);
  }, []);

  return (
    <div className={styles.container}>
      <Header isAuth={true} />
      <main>
        <DriverStatus />
        {driverOrders.length
          ? driverOrders.map((order, index) => {
              return (
                <DriverPopup
                  key={index}
                  address={order.address}
                  orderId={order.id}
                  orderStatus={order.status}
                  setDriverStatus={setDriverStatus}
                />
              );
            })
          : ''}
      </main>
    </div>
  );
}

export default DriverContainer;
