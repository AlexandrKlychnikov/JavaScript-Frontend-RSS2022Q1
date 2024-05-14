/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { TWinner, WinnersOrderBy, WinnersSortBy } from '../../types/types';
import TableItem from './tableItem';
import styles from './winners.module.sass';

interface IProps {
  winners: TWinner[];
  sortOrder: WinnersOrderBy;
  sortBy: WinnersSortBy;
  onWinsClick: () => void;
  onTimeClick: () => void;
}

enum SortSymbols {
  sortable = '⇅',
  ASC = '▼',
  DESC = '▲',
}

export default class WinnersTable extends React.Component<IProps, {}> {
  render(): JSX.Element {
    const { winners, sortBy, sortOrder, onTimeClick, onWinsClick } = this.props;

    const isSortByWins = sortBy === WinnersSortBy.wins;
    const isSortByTime = sortBy === WinnersSortBy.time;
    const orderBySymbol =
      sortOrder === WinnersOrderBy.ASC ? SortSymbols.ASC : SortSymbols.DESC;

    const items = winners.map((winner, index) => {
      const { id, ...winnerProps } = winner;
      return <TableItem key={id} id={index + 1} {...winnerProps} />;
    });

    return (
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Car</th>
            <th className={styles.name} scope="col">
              Name
            </th>
            <th scope="col" style={{ cursor: 'pointer' }} onClick={onWinsClick}>
              Wins {isSortByWins ? orderBySymbol : SortSymbols.sortable}
            </th>
            <th scope="col" style={{ cursor: 'pointer' }} onClick={onTimeClick}>
              Best time (s){' '}
              {isSortByTime ? orderBySymbol : SortSymbols.sortable}
            </th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </table>
    );
  }
}
