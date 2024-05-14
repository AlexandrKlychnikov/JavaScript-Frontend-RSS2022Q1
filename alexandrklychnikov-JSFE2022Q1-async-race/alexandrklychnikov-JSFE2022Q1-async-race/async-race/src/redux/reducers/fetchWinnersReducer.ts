import { IWinnersData } from './../../types/interface';

interface IWinnersAction {
  winners: IWinnersData[];
  addition: IWinnersData[];
  count: number;
}

const initialState: IWinnersAction = {
  winners: [],
  addition: [],
  count: 0,
};

export interface IGetWinnersReducers {
  type: string;
  payload: {
    winners: IWinnersData[];
    addition: IWinnersData[];
    count: number;
  };
}

export const fetchWinnersReducer = (
  state = initialState,
  action: IGetWinnersReducers
): IWinnersAction => {
  if (action.type === 'GET_WINNERS') {
    return {
      ...state,
      winners: [...action.payload.winners],
      addition: [...action.payload.addition],
      count: action.payload.count,
    };
  }
  return state;
};
