import { IGarageCarData } from './../../types/interface';
import { BASE_URL, MAX_CARS_ON_PAGE, PATH } from '../../shared/constants';
import { IGetCarsReducers } from '../reducers/fetchCarsReducer';
import { Dispatch } from 'redux';

const getCarsAction = (payload: { cars: IGarageCarData[]; count: number }) => ({
  type: 'GET_CARS',
  payload,
});

export const fetchCars = (page: number) => {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function (dispatch: Dispatch<IGetCarsReducers>) {
    fetch(`${BASE_URL}${PATH.garage}?_page=${page}&_limit=${MAX_CARS_ON_PAGE}`)
      .then((response) =>
        response.json().then((cars) => ({
          count: Number(response.headers.get('X-Total-Count')),
          cars,
        }))
      )
      .then((result) => dispatch(getCarsAction(result)));
  };
};
