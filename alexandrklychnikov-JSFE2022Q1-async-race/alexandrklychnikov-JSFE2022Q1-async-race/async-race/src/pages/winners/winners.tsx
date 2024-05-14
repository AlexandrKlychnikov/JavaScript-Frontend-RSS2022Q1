import React from 'react';
import Race from '../../services/race';
import { MAX_WINNERS_TABLE } from '../../shared/constants';
import { IWinnersData } from '../../types/interface';
import { TWinner, WinnersOrderBy, WinnersSortBy } from '../../types/types';
import common from './../common/common.module.sass';
import Paginator from './paginator';
import Table from './table';
import styles from './winners.module.sass';

type TState = {
  winners: TWinner[] | null;
  pagesAmount: number;
  winnersAmount: number;
  page: number;
  sortOrder: WinnersOrderBy;
  sortBy: WinnersSortBy;
};

export default class WinnersPage extends React.Component {
  state: TState = {
    winners: null,
    pagesAmount: 0,
    winnersAmount: 0,
    page: 1,
    sortOrder: WinnersOrderBy.ASC,
    sortBy: WinnersSortBy.id,
  };

  componentDidMount = (): void => {
    this.getWinnersToState();
  };

  render(): JSX.Element {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page, winnersAmount, pagesAmount, winners, sortOrder, sortBy } =
      this.state;

    const content =
      winners === null ? (
        'No winners found :( Try to make a race first!'
      ) : (
        <Table
          onTimeClick={this.onTimeFieldClick}
          onWinsClick={this.onWinsFieldClick}
          sortOrder={sortOrder}
          sortBy={sortBy}
          winners={winners}
        />
      );

    return (
      <section className={styles.winners}>
        <h1 className={common.sectionTitle}>WINNERS ({winnersAmount})</h1>
        <h2 className={common.pageNumber}>Page #{page}</h2>
        {content}
        <Paginator />
      </section>
    );
  }

  onTimeFieldClick = (): void => {
    this.setState(({ sortBy, sortOrder }: TState) => {
      if (sortBy === WinnersSortBy.time) {
        return { sortOrder: this.switchSortOrder(sortOrder) };
      } else return { sortBy: WinnersSortBy.time };
    });
  };

  private switchSortOrder(sortOrder: WinnersOrderBy) {
    return sortOrder === WinnersOrderBy.ASC
      ? WinnersOrderBy.DESC
      : WinnersOrderBy.ASC;
  }

  onWinsFieldClick = (): void => {
    this.setState(({ sortBy, sortOrder }: TState) => {
      if (sortBy === WinnersSortBy.wins) {
        return { sortOrder: this.switchSortOrder(sortOrder) };
      }
      return { sortBy: WinnersSortBy.wins };
    });
  };

  getWinnersToState = (
    page = this.state.page,
    limit = MAX_WINNERS_TABLE
  ): void => {
    const { sortOrder, sortBy } = this.state;

    Race.getWinners({
      page,
      limit,
      sort: sortBy,
      order: sortOrder,
    }).then((data: { items: IWinnersData[]; count: number }) => {
      const winners: TWinner[] = [];

      if (data.items.length === 0 && this.state.page !== 1)
        this.getWinnersToState(1);

      const getCarPromises = data.items.map((item) =>
        Race.getCar(item.id).then((car) =>
          winners.push({
            id: item.id,
            color: car.color,
            name: car.name,
            time: item.time,
            wins: item.wins,
          })
        )
      );

      Promise.all(getCarPromises).then(() => {
        this.setState({
          winners,
          winnersAmount: data.count,
          pagesAmount: Math.ceil(data.count / limit),
          page,
        });
      });
    });
  };
}
