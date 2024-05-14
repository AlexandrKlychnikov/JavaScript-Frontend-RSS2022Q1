import { MouseEvent } from 'react';
import actions from '../redux/actions/actions';
import Race from './race';

const handleRemoveCar = (e: MouseEvent<HTMLButtonElement>): void => {
  const btn = e.target as HTMLButtonElement;
  const carId = btn.dataset.id as string;
  Race.deleteCar(+carId);
  actions.removeCar();
};

export default handleRemoveCar;
