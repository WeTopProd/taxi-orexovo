import React from 'react';
import styles from './Header.module.scss';
import mainLogo from '../../../assets/img/logo-oz.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={mainLogo} alt={'лого'} />
    </header>
  );
};

export default Header;
