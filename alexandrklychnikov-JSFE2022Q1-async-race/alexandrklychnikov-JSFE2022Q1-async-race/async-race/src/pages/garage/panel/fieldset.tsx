import React, { ChangeEvent, FormEvent } from 'react';
import { ICar } from '../../../types/interface';
import styles from './panel.module.sass';

interface IFieldset {
  name: string;
  handleClick: (e: FormEvent) => void;
  handleChangeText: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeColor: (e: ChangeEvent<HTMLInputElement>) => void;
  values: ICar;
}

export default function Fieldset({
  name,
  handleClick,
  handleChangeColor,
  handleChangeText,
  values,
}: IFieldset): JSX.Element {
  return (
    <fieldset className={styles.fieldset}>
      <input
        className={[styles.input, styles.panelCreateText].join(' ')}
        type="text"
        onChange={handleChangeText}
        value={values.name}
      />
      <input
        className={[styles.input, styles.panelCreateColor].join(' ')}
        onChange={handleChangeColor}
        type="color"
        value={values.color}
      />
      <button
        className={[styles.btn, styles.panelCreate].join(' ')}
        id={name}
        onClick={handleClick}
        type="button"
      >
        {name}
      </button>
    </fieldset>
  );
}
