import React from 'react';
import styles from './Map.module.scss';
import { useYandexMap } from './useYandexMap';
import MapLegend from '../MapLegend/MapLegend';

const Map = () => {
  useYandexMap();

  return (
    <div className={styles.container}>
      <MapLegend />
      <div id="map" className={styles.map}></div>
    </div>
  );
};

export default Map;
