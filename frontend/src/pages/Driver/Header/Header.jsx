import React from 'react';
import styles from './Header.module.scss';
import CarNumber from '../CarNumber/CarNumber';
import mainLogo from '../../../assets/img/logo-oz.png';
import { routes } from '../../../helpers/routes';
import { useNavigate } from 'react-router-dom';
import { logoutQuery } from '../../../services/authService';
import ButtonReload from '../ButtonReload/ButtonReload';

const Header = ({ isAuth = false }) => {
  const navigate = useNavigate();

  const onClickLogout = () => {
    return logoutQuery()
      .then(() => {
        localStorage.clear();
        navigate(routes.login);
      })
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <header className={styles.header}>
      <img
        className={styles.logo}
        width={'120'}
        height={'33'}
        src={mainLogo}
        alt={'лого'}
      />
      <div className={styles.btn_reload}>
        <ButtonReload />
      </div>
      <div className={styles.btns}>
        {isAuth ? (
          <>
            <CarNumber />
            <button onClick={onClickLogout} className={styles.btn_logout}>
              Выйти
            </button>
          </>
        ) : (
          ''
        )}
      </div>
    </header>
  );
};

export default Header;
