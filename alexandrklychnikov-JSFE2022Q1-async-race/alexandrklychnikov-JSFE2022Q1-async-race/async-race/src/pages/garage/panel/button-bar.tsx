import React from 'react';
import actions from '../../../redux/actions/actions';
import { useAppSelector } from '../../../redux/hooks';
import { IWinner } from '../../../redux/reducers/winnerStateReducer';
import Race from '../../../services/race';
import { IEngineData, IGarageCarData } from '../../../types/interface';
import { CarStatus } from '../../../types/types';
import styles from './panel.module.sass';

interface IButtonBar {
  handleGenerate: () => void;
}

export default function ButtonBar({ handleGenerate }: IButtonBar): JSX.Element {
  const cars: IGarageCarData[] = useAppSelector((state) => state.cars.cars);
  const winner: IWinner = useAppSelector((state) => state.winner);

  const startCar = (carId: number, engineData: IEngineData) => {
    const car = document.getElementById(carId.toString()) as HTMLDivElement;
    const carStatus = CarStatus.drive;
    const driveDuration =
      Math.round((engineData.distance / engineData.velocity / 1000) * 100) /
      100;
    actions.startCar(carId, carStatus, driveDuration);
    car.addEventListener('transitionend', (e: TransitionEvent) => {
      const finishTime = e.elapsedTime;
      if (
        parseInt(window.getComputedStyle(car).left) >=
        window.innerWidth - 210
      ) {
        actions.setWinner(
          +car.id,
          cars.find((c) => c.id === +car.id)
            ? cars.find((c) => c.id === +car.id)?.name
            : '',
          finishTime
        );
      }
    });
  };

  function stopCar(carId: number) {
    const carStatus = CarStatus.stopped;
    const driveDuration = 0;
    actions.stopCar(carId, carStatus, driveDuration);
  }

  const handleClickRace = (): void => {
    cars.forEach((e) => {
      Race.startEngine(e.id).then((engineData) => {
        startCar(e.id, engineData);
        Race.drive(e.id).then((data) => {
          if (!data.success) stopCar(e.id);
        });
      });
    });
  };

  const handleClickReset = (): void => {
    Race.saveWinner(winner.id, winner.time);
    actions.resetWinner(0, '', 0);
    cars.forEach((e) => {
      stopCar(e.id);
      Race.stopEngine(e.id);
      actions.backCar(e.id, CarStatus.stopped, 0, '0');
    });
  };

  return (
    <fieldset className={styles.fieldset}>
      <button
        className={[styles.btn, styles.panelRace].join(' ')}
        onClick={handleClickRace}
        type="button"
      >
        RACE
      </button>
      <button
        className={[styles.btn, styles.panelReset].join(' ')}
        onClick={handleClickReset}
        type="button"
      >
        RESET
      </button>
      <button
        className={[styles.btn, styles.panelGenerate].join(' ')}
        onClick={handleGenerate}
        type="button"
      >
        GENERATE
      </button>
      <p
        className={
          winner.id !== 0
            ? [styles.message, styles.visible].join(' ')
            : styles.message
        }
      >
        {winner.name} went first with {winner.time}s!
      </p>
    </fieldset>
  );
}
