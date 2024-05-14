import React, { MouseEvent } from 'react';
import actions from '../../../../redux/actions/actions';
import { store } from '../../../../redux/store';
import handleRemoveCar from '../../../../services/handleRemoveCar';
import handleSelectCar from '../../../../services/handleSelectCar';
import Race from '../../../../services/race';
import { IEngineData } from '../../../../types/interface';
import { CarStatus } from '../../../../types/types';
import styles from './start.module.sass';

export interface IStart {
  id: number;
  name: string;
  refCar: React.MutableRefObject<null> | undefined;
}

export default function Start({ id, name, refCar }: IStart): JSX.Element {
  const selected = store.getState().selected;
  const startedCars = store.getState().started;
  const car = refCar?.current as never as HTMLDivElement;

  const startCar = (carId: number, engineData: IEngineData) => {
    const carStatus = CarStatus.drive;
    const driveDuration =
      Math.round(engineData.distance / engineData.velocity) / 1000;
    actions.startCar(carId, carStatus, driveDuration);
    car.addEventListener('transitionend', (e) => {
      const finishTime = e.elapsedTime;
      if (window.getComputedStyle(car).left >= `${window.innerWidth - 210}`) {
        console.log(`Car with id: ${id} finishid with time ${finishTime}`);
      }
    });
  };

  function stopCar(carId: number) {
    const carStatus = CarStatus.stopped;
    const driveDuration = 0;
    actions.stopCar(carId, carStatus, driveDuration);
  }

  const handleClickStart = (e: MouseEvent<HTMLButtonElement>): void => {
    const btn = e.target as HTMLButtonElement;
    const carId = btn.dataset.id as string;
    Race.startEngine(+carId).then((engineData) => {
      startCar(+carId, engineData);
      Race.drive(+carId).then((data) => {
        if (!data.success) stopCar(+carId);
      });
    });
  };

  const handleClickStop = (): void => {
    Race.stopEngine(id);
    actions.backCar(id, CarStatus.stopped, 0, '0px');
    car.style.left = '0';
    car.style.transition = 'none';
  };

  return (
    <div className="track__start">
      <button
        data-id={id}
        className={
          selected === id.toString()
            ? [styles.select, styles.selected].join(' ')
            : styles.select
        }
        onClick={handleSelectCar}
      >
        SELECT
      </button>
      <button data-id={id} className={styles.remove} onClick={handleRemoveCar}>
        REMOVE
      </button>
      <span className={styles.label}>{name}</span>
      <div className=""></div>
      <button
        data-id={id}
        className={
          startedCars.find((e) => e.carId === id)
            ? [styles.btnStart, styles.drive].join(' ')
            : styles.btnStart
        }
        onClick={handleClickStart}
      >
        Start
      </button>
      <button
        data-id={id}
        className={
          !startedCars.find((e) => e.carId === id)
            ? [styles.btnStop, styles.stay].join(' ')
            : styles.btnStop
        }
        onClick={handleClickStop}
      >
        Back
      </button>
    </div>
  );
}
