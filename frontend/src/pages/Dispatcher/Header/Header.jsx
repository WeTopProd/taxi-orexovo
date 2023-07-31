import React from 'react';
import styles from './Header.module.scss';
import Notice from '../Notice/Notice';
import mainLogo from '../../../assets/img/logo-oz.png';
import OrdersHistory from '../OrdersHistory/OrdersHistory';

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={mainLogo} alt={'logo'} />
      <div className={styles.btns}>
        {/*<AddCar />*/}
        <OrdersHistory />
        <Notice />
      </div>
    </header>
  );
};

export default Header;
