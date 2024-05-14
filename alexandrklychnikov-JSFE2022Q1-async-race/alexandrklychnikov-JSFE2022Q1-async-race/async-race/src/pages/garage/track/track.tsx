import React, { useRef } from 'react';
import { useAppSelector } from '../../../redux/hooks';
import { IGarageCarData } from '../../../types/interface';
import { CarStatus } from '../../../types/types';
import Car from './Car';
import Start from './start/start';
import styles from './track.module.sass';

export default function Track({
  id,
  name,
  color,
}: IGarageCarData): JSX.Element {
  const refCar = useRef(null);
  const car = refCar.current as never as Element;
  const cars = useAppSelector((state) => state.started);

  return (
    <li className={styles.track}>
      <Start id={id} name={name} refCar={refCar} />
      <div
        id={id.toString()}
        ref={refCar}
        className={
          cars.find((e) => e.carId === id)?.distance === '0'
            ? [styles.car, styles.back].join(' ')
            : styles.car
        }
        style={{
          left: `${
            cars.find((e) => e.carId === id)?.carStatus === CarStatus.stopped
              ? window.getComputedStyle(car).left
              : cars.find((e) => e.carId === id)
              ? `${window.innerWidth - 210}px`
              : '0'
          }`,
          transition: `left ${
            cars.find((e) => e.carId === id)
              ? cars.find((e) => e.carId === id)?.driveDuration
              : '0'
          }s linear`,
        }}
      >
        <Car color={color} />
      </div>
      <div className={styles.finish}>
        <div className={styles.flag}></div>
      </div>
    </li>
  );
}
