import { MAX_CARS_ON_PAGE } from './../shared/constants';
import actions from '../redux/actions/actions';
import { store } from '../redux/store';

const handleClickNext = (): void => {
  const page = store.getState().page.page;
  const total = store.getState().cars.count;
  const lastPage = Math.ceil(total / MAX_CARS_ON_PAGE);
  if (page < lastPage) {
    actions.nextPage();
  } else {
    return;
  }
};

export default handleClickNext;
