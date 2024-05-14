import { CarStatus } from './../../types/types';
import { store } from '../store';

const actions = {
  nextPage(): void {
    store.dispatch({
      type: 'NEXT_PAGE',
      payload: '',
    });
  },

  prevPage(): void {
    store.dispatch({
      type: 'PREV_PAGE',
      payload: '',
    });
  },

  removeCar(): void {
    store.dispatch({
      type: 'REMOVE_CAR',
      payload: '',
    });
  },

  createCar(): void {
    store.dispatch({
      type: 'CREATE_CAR',
      payload: '',
    });
  },

  generateCars(): void {
    store.dispatch({
      type: 'GENERATE_CARS',
      payload: '',
    });
  },

  startCar(
    carId: number,
    carStatus: CarStatus.drive,
    driveDuration: number
  ): void {
    store.dispatch({
      type: 'START_CAR',
      payload: { carId, carStatus, driveDuration },
    });
  },

  stopCar(
    carId: number,
    carStatus: CarStatus.stopped,
    driveDuration: number
  ): void {
    store.dispatch({
      type: 'STOP_CAR',
      payload: { carId, carStatus, driveDuration },
    });
  },

  backCar(
    carId: number,
    carStatus: CarStatus.stopped,
    driveDuration: number,
    distance: string
  ): void {
    store.dispatch({
      type: 'BACK_CAR',
      payload: { carId, carStatus, driveDuration, distance },
    });
  },

  setWinner(id: number, name: string | undefined, time: number): void {
    store.dispatch({
      type: 'SET_WINNER',
      payload: { id, name, time },
    });
  },
  resetWinner(id: number, name: string | undefined, time: number): void {
    store.dispatch({
      type: 'RESET_WINNER',
      payload: { id, name, time },
    });
  },
};

export default actions;
