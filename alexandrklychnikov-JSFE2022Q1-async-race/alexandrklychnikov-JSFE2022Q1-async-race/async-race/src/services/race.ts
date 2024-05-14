import { BASE_URL, PATH } from '../shared/constants';
import {
  ICar,
  IEngineData,
  IGarageCarData,
  IWinnersData,
} from '../types/interface';
import { CarStatus, TWinnersOptions } from '../types/types';

export default class Race {
  static async getCars(
    page = 1,
    limit = 7
  ): Promise<{ cars: IGarageCarData[]; count: number }> {
    const response = await fetch(
      `${BASE_URL}${PATH.garage}?_page=${page}&_limit=${limit}`
    );
    return {
      cars: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
  }

  static async createCar(car: ICar): Promise<ICar> {
    return (
      await fetch(`${BASE_URL}${PATH.garage}`, {
        method: 'POST',
        body: JSON.stringify(car),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async getCar(id: number): Promise<ICar> {
    return (await fetch(`${BASE_URL}${PATH.garage}/${id}`)).json();
  }

  static async updateCar(id: number, car: ICar): Promise<void> {
    await fetch(`${BASE_URL}${PATH.garage}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  static async deleteCar(id: number): Promise<void> {
    return (
      await fetch(`${BASE_URL}${PATH.garage}/${id}`, { method: 'DELETE' })
    ).json();
  }

  private static async switchEngineMode(id: number, carStatus: CarStatus) {
    return (
      await fetch(`${BASE_URL}${PATH.engine}?id=${id}&status=${carStatus}`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: id,
          status: carStatus,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    ).json();
  }

  static startEngine(id: number): Promise<IEngineData> {
    return this.switchEngineMode(id, CarStatus.started);
  }

  static stopEngine(id: number): Promise<IEngineData> {
    return this.switchEngineMode(id, CarStatus.stopped);
  }

  static async drive(id: number): Promise<{ id: number; success: boolean }> {
    const response = await fetch(
      `${BASE_URL}${PATH.engine}?id=${id}&status=${CarStatus.drive}`,
      { method: 'PATCH' }
    ).catch();
    return response.status !== 200
      ? { id, success: false }
      : { id, ...(await response.json()) };
  }

  static async createWinner(carWinner: IWinnersData): Promise<IWinnersData> {
    return (
      await fetch(`${BASE_URL}${PATH.winners}`, {
        method: 'POST',
        body: JSON.stringify(carWinner),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async getWinner(id: number): Promise<IWinnersData> {
    return (await fetch(`${BASE_URL}${PATH.winners}/${id}`)).json();
  }

  static async getWinnerStatus(id: number): Promise<number> {
    return (await fetch(`${BASE_URL}${PATH.winners}/${id}`)).status;
  }

  static async deleteWinner(id: number): Promise<void> {
    return (
      await fetch(`${BASE_URL}${PATH.winners}/${id}`, { method: 'DELETE' })
    ).json();
  }

  static async updateWinner(carWinner: IWinnersData): Promise<IWinnersData> {
    const { id, wins, time } = carWinner;

    return (
      await fetch(`${BASE_URL}${PATH.winners}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ wins, time }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).json();
  }

  static async saveWinner(id: number, time: number): Promise<IWinnersData> {
    const status = await Race.getWinnerStatus(id);

    // eslint-disable-next-line @typescript-eslint/return-await
    if (status === 404) return await Race.createWinner({ id, wins: 1, time });

    const winner = await Race.getWinner(id);

    const newTime = time < winner.time ? time : winner.time;

    await Race.updateWinner({ id, wins: winner.wins + 1, time: newTime });

    return { id, wins: winner.wins + 1, time };
  }

  static async getWinners({
    page,
    limit,
    sort,
    order,
  }: TWinnersOptions): Promise<{ items: IWinnersData[]; count: number }> {
    const response = await fetch(
      `${BASE_URL}${PATH.winners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
    );

    return {
      items: await response.json(),
      count: Number(response.headers.get('X-Total-Count')),
    };
  }
}
