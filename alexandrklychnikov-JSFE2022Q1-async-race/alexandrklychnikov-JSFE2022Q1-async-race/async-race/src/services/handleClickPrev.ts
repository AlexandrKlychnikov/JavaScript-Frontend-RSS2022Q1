import actions from '../redux/actions/actions';
import { store } from '../redux/store';
import { FIRST_PAGE } from '../shared/constants';

const handleClickPrev = (): void => {
  const page = store.getState().page.page;
  if (page > FIRST_PAGE) {
    actions.prevPage();
  } else {
    return;
  }
};

export default handleClickPrev;
