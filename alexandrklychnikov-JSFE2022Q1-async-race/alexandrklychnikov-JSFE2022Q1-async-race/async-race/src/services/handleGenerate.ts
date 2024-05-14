import actions from '../redux/actions/actions';
import { carColorGenerator, carModelGenerator } from './generator';
import Race from './race';

export const handleGenerate = (): void => {
  actions.generateCars();
  for (let i = 0; i < 100; i++) {
    Race.createCar({ name: carModelGenerator(), color: carColorGenerator() });
  }
};
