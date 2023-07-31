import React from 'react';
import styles from './CarsFree.module.scss';
import cx from 'classnames';
import { declOfNum } from '../../../helpers/declOfNum';
import { useBarmanContext } from '../BarmanContext';
import { countByField } from '../../../helpers/countObjects';
import { CARS_DECL } from '../../../helpers/dictionaries';

const CarsFree = () => {
  const { carsFreeList } = useBarmanContext();
  const carsFreeCount = countByField(carsFreeList, 'status', 'free');

  return (
    <div className={styles.cars}>
      <span
        className={cx(
          styles.cars_label,
          carsFreeCount ? '' : styles.cars_label__busy,
        )}></span>

      {carsFreeCount ? (
        <div className={styles.cars_count}>
          {carsFreeCount} {declOfNum(carsFreeCount, CARS_DECL)}
        </div>
      ) : (
        <div className={cx(styles.cars_count, styles.cars_count__busy)}>
          нет свободных машин
        </div>
      )}
    </div>
  );
};

export default CarsFree;
