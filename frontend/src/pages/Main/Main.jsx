import styles from './Main.module.scss';
import Header from './Header/Header';
import { Link } from 'react-router-dom';
import barmen_logo from '../../assets/img/barmen_logo.png';
import dispatcher_logo from '../../assets/img/dispatcher_logo.png';
import driver_logo from '../../assets/img/driver_logo.png';

function Main() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Link className={styles.link} to={`./barman`}>
          <img src={barmen_logo} width="150" height="150" alt="Бармен" />
          <h4>Перейти в терминал бармена</h4>
        </Link>
        <Link className={styles.link} to={`./dispatcher`}>
          <img src={dispatcher_logo} width="150" height="150" alt="Диспетчер" />
          <h4>Перейти в терминал диспетчера</h4>
        </Link>
        <Link className={styles.link} to={`./driver`}>
          <img src={driver_logo} width="150" height="150" alt="Водитель" />
          <h4>Перейти в терминал водителя</h4>
        </Link>
      </main>
    </div>
  );
}

export default Main;
