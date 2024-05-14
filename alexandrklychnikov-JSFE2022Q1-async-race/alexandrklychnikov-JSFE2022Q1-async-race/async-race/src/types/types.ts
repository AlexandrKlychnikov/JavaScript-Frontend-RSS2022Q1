export enum CarStatus {
  started = 'started',
  stopped = 'stopped',
  drive = 'drive',
}

export enum WinnersSortBy {
  id = 'id',
  wins = 'wins',
  time = 'time',
}

export enum WinnersOrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type TWinnersOptions = {
  page: number;
  limit: number;
  sort: WinnersSortBy;
  order: WinnersOrderBy;
};

export type TWinner = {
  id: number;
  color: string;
  name: string;
  time: number;
  wins: number;
};
