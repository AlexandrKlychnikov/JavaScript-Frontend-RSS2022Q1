export interface ISelectedCar {
  type: string;
  payload: string;
}

const selectedCarReducer = (state = '', action: ISelectedCar): string => {
  switch (action.type) {
    case 'CAR_SELECT':
      return action.payload;
    case 'CAR_UNSELECT':
      return '';
  }
  return state;
};

export default selectedCarReducer;
