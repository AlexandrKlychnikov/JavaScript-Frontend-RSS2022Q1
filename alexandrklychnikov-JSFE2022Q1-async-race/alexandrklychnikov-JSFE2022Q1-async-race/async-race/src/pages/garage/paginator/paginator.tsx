import React from 'react';
import { store } from '../../../redux/store';
import handleClickNext from '../../../services/handleClickNext';
import handleClickPrev from '../../../services/handleClickPrev';
import { FIRST_PAGE, MAX_CARS_ON_PAGE } from '../../../shared/constants';
import btnStyle from '../../common/button/button.module.sass';
import styles from './paginator.module.sass';

export default function Paginator(): JSX.Element {
  const amount = store.getState().cars.count;
  const lastPage = Math.ceil(amount / MAX_CARS_ON_PAGE);
  const page = store.getState().page.page;

  return (
    <div className={styles.panginator}>
      <button
        className={
          page === FIRST_PAGE
            ? [btnStyle.button, styles.disabled].join(' ')
            : btnStyle.button
        }
        onClick={handleClickPrev}
      >
        🡄PREV
      </button>
      <button
        className={
          page >= lastPage
            ? [btnStyle.button, styles.disabled].join(' ')
            : btnStyle.button
        }
        onClick={handleClickNext}
      >
        NEXT🡆
      </button>
    </div>
  );
}
