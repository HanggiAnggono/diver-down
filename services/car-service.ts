import {Unit} from '~/services';
import {units} from '~/services/mock';

export const fetchCars = (): Promise<Array<Unit>> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(units);
    }, 1000);
  });
};

export function getUnitById(id: string) {
  return new Promise<Unit>(resolve => {
    setTimeout(() => {
      const unit = units.find(un => un.id === id);
      resolve(unit as Unit);
    }, 1000);
  });
}
