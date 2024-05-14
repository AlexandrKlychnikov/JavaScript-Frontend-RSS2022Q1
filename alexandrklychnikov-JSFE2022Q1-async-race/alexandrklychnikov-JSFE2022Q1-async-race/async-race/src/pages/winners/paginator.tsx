import React from 'react';
import { store } from '../../redux/store';
import { FIRST_PAGE, MAX_WINNERS_TABLE } from './../../shared/constants';
import btnStyle from './../common/button/button.module.sass';
import styles from '../garage/paginator/paginator.module.sass';

export default function Paginator(): JSX.Element {
  const amount = store.getState().winners.count;
  const lastPage = Math.ceil(amount / MAX_WINNERS_TABLE);
  const page = store.getState().page.page;

  return (
    <div className={styles.panginator}>
      <button
        className={
          page === FIRST_PAGE
            ? [btnStyle.button, styles.disabled].join(' ')
            : btnStyle.button
        }
        onClick={() => {}}
      >
        🡄PREV
      </button>
      <button
        className={
          page >= lastPage
            ? [btnStyle.button, styles.disabled].join(' ')
            : btnStyle.button
        }
        onClick={() => {}}
      >
        NEXT🡆
      </button>
    </div>
  );
}
