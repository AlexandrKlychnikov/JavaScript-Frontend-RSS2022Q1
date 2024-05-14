import { MouseEvent } from 'react';
import { store } from '../redux/store';

const handleSelectCar = (e: MouseEvent<HTMLButtonElement>): void => {
  const btn = e.target as HTMLButtonElement;
  const carId = btn.dataset.id as string;
  const state = store.getState();
  if (state.selected === carId) {
    store.dispatch({
      type: 'CAR_UNSELECT',
      payload: '',
    });
  } else {
    store.dispatch({
      type: 'CAR_SELECT',
      payload: carId,
    });
  }
};

export default handleSelectCar;
