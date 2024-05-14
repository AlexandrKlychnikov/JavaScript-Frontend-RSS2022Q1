import { IGarageCarData } from './../../types/interface';

interface ICarsAction {
  cars: IGarageCarData[];
  count: number;
}

const initialState: ICarsAction = {
  cars: [],
  count: 0,
};

export interface IGetCarsReducers {
  type: string;
  payload: {
    cars: IGarageCarData[];
    count: number;
  };
}

export const fetchCarsReducer = (
  state = initialState,
  action: IGetCarsReducers
): ICarsAction => {
  if (action.type === 'GET_CARS') {
    return {
      ...state,
      cars: [...action.payload.cars],
      count: action.payload.count,
    };
  } else if (action.type === 'REMOVE_CAR') {
    return {
      ...state,
      count: state.count - 1,
    };
  } else if (action.type === 'CREATE_CAR') {
    return {
      ...state,
      count: state.count + 1,
    };
  } else if (action.type === 'GENERATE_CARS') {
    return {
      ...state,
      count: state.count + 100,
    };
  }
  return state;
};
