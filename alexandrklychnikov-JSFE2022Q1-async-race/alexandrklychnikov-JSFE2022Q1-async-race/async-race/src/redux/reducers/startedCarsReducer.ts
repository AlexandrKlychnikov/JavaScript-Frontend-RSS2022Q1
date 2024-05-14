import { CarStatus } from '../../types/types';

export interface ICarState {
  carId: number;
  carStatus?: string;
  driveDuration?: number;
  distance?: string;
}

export interface IStartedCars {
  type: string;
  payload: ICarState;
}

const startedCarsReducer = (
  state: ICarState[] = [],
  action: IStartedCars
): ICarState[] => {
  switch (action.type) {
    case 'START_CAR':
      return [...state, action.payload];
    case 'STOP_CAR':
      return [...state].map((e) => {
        if (e.carId === action.payload.carId) {
          e.carStatus = CarStatus.stopped;
          e.distance = action.payload.distance;
        }
        return e;
      });
    case 'BACK_CAR':
      return [...state].filter((e) => e.carId !== action.payload.carId);
    default:
      return state;
  }
};

export default startedCarsReducer;
