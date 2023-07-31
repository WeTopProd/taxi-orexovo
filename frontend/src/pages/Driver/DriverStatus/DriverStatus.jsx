import React from 'react';
import styles from './DriverStatus.module.scss';
import cx from 'classnames';
import { useDriverContext } from '../DriverContext';
import { changeDriverDataQuery } from '../../../services/userService';
import { DRIVER_STATUS } from '../../../helpers/dictionaries';

const DriverStatus = () => {
  const { carId, setDriverStatus, driverStatus } = useDriverContext();

  const onClickStatusFree = () => {
    setDriverStatus('free');
    changeDriverDataQuery({ status: 'free' }, carId).catch((err) => {
      alert(`не удалось изменить статус ${err}`);
    });
  };

  const onClickStatusBusy = () => {
    setDriverStatus('busy');
    changeDriverDataQuery({ status: 'busy' }, carId).catch((err) => {
      alert(`не удалось изменить статус ${err}`);
    });
  };

  return (
    <div>
      <p
        className={cx(
          styles.status_text,
          driverStatus === 'busy' ? styles.status_text_busy : '',
        )}>
        Текущий статус: {DRIVER_STATUS[driverStatus]}
      </p>
      <div>
        <p className={styles.change_status_text}>Изменить статус</p>
        <div className={styles.change_status_btns}>
          <button
            className={styles.change_status_btn}
            onClick={onClickStatusFree}
            disabled={driverStatus === 'free'}>
            Я свободен
          </button>
          <button
            className={cx(
              styles.change_status_btn,
              styles.change_status_btn_busy,
            )}
            onClick={onClickStatusBusy}
            disabled={driverStatus === 'busy'}>
            Я занят
          </button>
        </div>
      </div>
    </div>
  );
};

export default DriverStatus;
