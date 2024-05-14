export interface ICurrentPageAction {
  type: string;
  payload: number;
}

type State = {
  page: number;
};

const defaultState = {
  page: 1,
};

const currentPageReducer = (
  state = defaultState,
  action: ICurrentPageAction
): State => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return { ...state, page: state.page + 1 };
    case 'PREV_PAGE':
      return { ...state, page: state.page - 1 };
    default:
      return state;
  }
};

export default currentPageReducer;
