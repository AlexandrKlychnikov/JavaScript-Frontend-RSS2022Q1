import React from 'react';
import { Link } from 'react-router-dom';
import actions from '../../../redux/actions/actions';
import { useAppSelector } from '../../../redux/hooks';
import Race from '../../../services/race';
import { CarStatus } from '../../../types/types';
import Button from '../button/button';
import style from './header.module.sass';

function Header(): JSX.Element {
  const cars = useAppSelector((state) => state.cars.cars);
  const winner = useAppSelector((state) => state.winner);

  function stopCar(carId: number) {
    const carStatus = CarStatus.stopped;
    const driveDuration = 0;
    actions.stopCar(carId, carStatus, driveDuration);
  }

  const handleClickReset = (): void => {
    if (winner.id > 0) {
      Race.saveWinner(winner.id, winner.time);
      actions.resetWinner(0, '', 0);
      cars.forEach((e) => {
        stopCar(e.id);
        Race.stopEngine(e.id);
        actions.backCar(e.id, CarStatus.stopped, 0, '0');
      });
    }
  };

  return (
    <header className={style.header}>
      <img
        className={style.logo}
        src={process.env.PUBLIC_URL + '/images/wheel.jpg'}
        alt="wheel"
      />
      <nav>
        <ul className={style.navItems}>
          <li>
            <Link to="/">
              <Button title="GARAGE" />
            </Link>
          </li>
          <li>
            <Link to="/winners" onClick={handleClickReset}>
              <Button title="WINNERS" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
