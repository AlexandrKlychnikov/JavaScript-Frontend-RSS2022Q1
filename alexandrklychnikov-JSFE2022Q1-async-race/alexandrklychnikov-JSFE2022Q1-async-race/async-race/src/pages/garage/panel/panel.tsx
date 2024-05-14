import React, { ChangeEvent, useState } from 'react';
import actions from '../../../redux/actions/actions';
import { store } from '../../../redux/store';
import { handleGenerate } from '../../../services/handleGenerate';
import Race from '../../../services/race';
import { INITIAL_COLOR, INITIAL_NAME } from '../../../shared/constants';
import ButtonBar from './button-bar';
import Fieldset from './fieldset';
import styles from './panel.module.sass';

export default function Panel(): JSX.Element {
  const [createCarName, setCreateCarName] = useState(INITIAL_NAME);
  const [createCarColor, setCreateCarColor] = useState(INITIAL_COLOR);
  const [updateCarName, setUpdateCarName] = useState(INITIAL_NAME);
  const [updateCarColor, setUpdateCarColor] = useState(INITIAL_COLOR);

  const createColor = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateCarColor(e.target.value);
  };
  const createName = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateCarName(e.target.value);
  };
  const updateColor = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCarColor(e.target.value);
  };

  const updateName = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdateCarName(e.target.value);
  };
  const handleCreate = (): void => {
    Race.createCar({ name: createCarName, color: createCarColor });
    setCreateCarName(INITIAL_NAME);
    setCreateCarColor(INITIAL_COLOR);
    actions.createCar();
  };

  const handleUpdate = (): void => {
    const selectedCar = +store.getState().selected;
    Race.updateCar(selectedCar, { name: updateCarName, color: updateCarColor });
    setUpdateCarName(INITIAL_NAME);
    setUpdateCarColor(INITIAL_COLOR);
    store.dispatch({
      type: 'CAR_UNSELECT',
      payload: '',
    });
  };
  return (
    <form className={styles.panel}>
      <Fieldset
        name="CREATE"
        handleClick={handleCreate}
        handleChangeColor={createColor}
        handleChangeText={createName}
        values={{ name: createCarName, color: createCarColor }}
      />
      <Fieldset
        name="UPDATE"
        handleClick={handleUpdate}
        handleChangeColor={updateColor}
        handleChangeText={updateName}
        values={{ name: updateCarName, color: updateCarColor }}
      />
      <ButtonBar handleGenerate={handleGenerate} />
    </form>
  );
}
