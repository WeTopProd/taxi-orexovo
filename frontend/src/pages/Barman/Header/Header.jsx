import React from 'react';
import styles from './Header.module.scss';
import CarsFree from '../CarsFree/CarsFree';
import mainLogo from '../../../assets/img/logo-oz.png';

const Header = () => {
  return (
    <div className={styles.header}>
      <img className={styles.logo} src={mainLogo} alt={'logo'} />
      <CarsFree />
    </div>
  );
};

export default Header;
