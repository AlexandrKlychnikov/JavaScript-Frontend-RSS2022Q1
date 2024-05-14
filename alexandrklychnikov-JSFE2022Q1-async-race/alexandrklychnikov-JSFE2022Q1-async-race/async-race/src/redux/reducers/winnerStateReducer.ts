interface IWinnerAction {
  type: string;
  payload: IWinner;
}

export interface IWinner {
  id: number;
  name: string | undefined;
  time: number;
}

const initialState = { id: 0, name: '', time: 0 };

const winnerStateReducer = (
  state: IWinner = initialState,
  action: IWinnerAction
): IWinner => {
  switch (action.type) {
    case 'SET_WINNER':
      return state.id === 0
        ? Object.assign({}, state, {
            id: action.payload.id,
            name: action.payload.name,
            time: action.payload.time,
          })
        : state;
    case 'RESET_WINNER':
      return initialState;
    default:
      return state;
  }
};

export default winnerStateReducer;
