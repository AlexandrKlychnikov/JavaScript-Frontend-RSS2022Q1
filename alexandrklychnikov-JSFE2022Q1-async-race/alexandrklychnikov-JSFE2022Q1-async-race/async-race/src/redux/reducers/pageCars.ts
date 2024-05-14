import { IGarageCarData } from '../../types/interface';

export interface IPageCars {
  type: string;
  payload: IGarageCarData[];
}

const pageCars = (
  state: IGarageCarData[] = [],
  action: IPageCars
): IGarageCarData[] => {
  if (action.type === 'GET_CARS') {
    state = action.payload;
  }
  return state;
};

export default pageCars;
