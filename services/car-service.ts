import {Unit} from '~/services';
import {units} from '~/services/mock';

export const fetchCars = (): Promise<Array<Unit>> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(units);
    }, 1000);
  });
};
