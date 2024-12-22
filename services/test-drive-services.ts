import {brands, models, testDrives} from '~/services/mock';

const resp = testDrives.map(td => {
  const model = models.find(m => m.id === td.unitId);
  const brand = brands.find(b => b.id === model?.brandId);

  return {
    ...td,
    dateFrom: td.dateFrom.toISOString(),
    dateTo: td.dateTo.toISOString(),
    model,
    brand,
  };
});

export function getTestDrives(): Promise<typeof resp> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(resp);
    }, 1000);
  });
}
