import { fetchCarsReducer } from './fetchCarsReducer';
import { combineReducers } from 'redux';
import currentPageReducer from './currentPageReducer';
import selectedCarReducer from './selectedCarReducer';
import startedCarsReducer from './startedCarsReducer';
import winnerStateReducer from './winnerStateReducer';
import { fetchWinnersReducer } from './fetchWinnersReducer';

const rootReducer = combineReducers({
  cars: fetchCarsReducer,
  page: currentPageReducer,
  selected: selectedCarReducer,
  started: startedCarsReducer,
  winner: winnerStateReducer,
  winners: fetchWinnersReducer,
});

export default rootReducer;
