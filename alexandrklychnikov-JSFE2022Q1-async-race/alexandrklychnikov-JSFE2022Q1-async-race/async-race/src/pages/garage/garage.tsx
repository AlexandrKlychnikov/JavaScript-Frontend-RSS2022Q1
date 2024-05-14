import React, { useEffect } from 'react';
import common from '../common/common.module.sass';
import Panel from './panel/panel';
import Track from './track/track';
import Paginator from './paginator/paginator';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCars } from '../../redux/actions/asyncActions';
import { IGarageCarData } from '../../types/interface';

export default function Garage(): JSX.Element {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.page.page);
  const cars: IGarageCarData[] = useAppSelector((state) => state.cars.cars);
  const amount = useAppSelector((state) => state.cars.count);
  const selectedCar = useAppSelector((state) => state.selected);
  const startedCars = useAppSelector((state) => state.started);

  useEffect(() => {
    // @ts-ignore foo bar
    dispatch(fetchCars(page));
  }, [page, amount, selectedCar, startedCars]);

  return (
    <section className={common.section}>
      <Panel />
      <h1 className={common.sectionTitle}>GARAGE ({amount})</h1>
      <h2 className={common.pageNumber}>Page #{page}</h2>
      <ul className="cars">
        {cars.map(({ id, name, color }) => (
          <Track key={name + color + id} id={id} name={name} color={color} />
        ))}
      </ul>
      <Paginator />
    </section>
  );
}
