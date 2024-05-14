import React from 'react';
import Car from '../garage/track/Car';
import { TWinner } from './../../types/types';

const TableItem = ({ id, color, name, wins, time }: TWinner): JSX.Element => {
  return (
    <tr>
      <th>{id}</th>
      <td>{<Car color={color} />}</td>
      <td>{name}</td>
      <td>{wins}</td>
      <td>{time}</td>
    </tr>
  );
};

export default TableItem;
