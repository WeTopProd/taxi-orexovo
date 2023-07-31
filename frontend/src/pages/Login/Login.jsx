import React, { useState } from 'react';
import styles from './Login.module.scss';
import { setToken } from '../../services/localStorageService';
import { routes } from '../../helpers/routes';
import { useNavigate } from 'react-router-dom';
import { loginQuery } from '../../services/authService';
import { getUserInfoByToken } from '../../services/userService';
import {
  onPhoneInput,
  onPhoneKeyDown,
  onPhonePaste,
} from '../../helpers/phoneMask';
import Header from './Header/Header';

function Login() {
  const [inputPhone, setInputPhone] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();

  // const onSuccessLogin = (res) => {
  //   const token = res?.data?.auth_token;
  //   setToken(token);
  //   getUserInfoByToken()
  //     .then(({ data }) => {
  //       const userType = data.user_type;
  //       if (userType === 'dispatcher') navigate(routes.dispatcher);
  //       if (userType === 'bartender') navigate(routes.barman);
  //       if (userType === 'driver') navigate(routes.driver);
  //     })
  //     .catch((err) => {
  //       alert('Ошибка получения данных');
  //       console.log(err);
  //     });
  // };

  const onSuccessLogin = async (res) => {
    const token = res?.data?.auth_token;
    setToken(token);
    try {
      const { data } = await getUserInfoByToken();
      const userType = data.user_type;

      if (userType === 'dispatcher') navigate(routes.dispatcher);
      if (userType === 'barman') navigate(routes.barman);
      if (userType === 'driver') navigate(routes.driver);
    } catch (err) {
      alert('Ошибка получения данных');
      console.log(err);
    }
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    loginQuery(inputPhone, inputPassword)
      .then((res) => {
        res.request.status === 200
          ? onSuccessLogin(res)
          : alert('неверные данные');
      })
      .catch((err) => {
        alert('Данные введены с ошибкой');
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <section className={styles.login_wrapper}>
        <h2>Вход в личный кабинет</h2>
        <form onSubmit={onSubmitLogin}>
          <input
            type="tel"
            onKeyDown={onPhoneKeyDown}
            onInput={onPhoneInput}
            onPaste={onPhonePaste}
            onChange={(e) => setInputPhone(e.target.value)}
            value={inputPhone}
            placeholder="Телефон, пример +79001112233"
            maxLength={'12'}
            pattern={'^(+79)[0-9]{9}'}
            name="driver_phone_login"
            id="driver_phone_login"
            required={true}
          />
          <input
            type="password"
            value={inputPassword}
            onChange={(event) => setInputPassword(event.target.value)}
            placeholder="Пароль"
            name="driver_password_login"
            id="driver_password_login"
            required={true}
          />
          <button type={'submit'}>Войти</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
