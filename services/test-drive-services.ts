import {testDrives, units} from '~/services/mock';

export function getTestDriveUnits() {
  const availableUnits = units.filter(unit => {
    const tdUnitIDs = testDrives.map(td => td.unitId);
    return !tdUnitIDs.includes(unit.id);
  });
  return new Promise<typeof availableUnits>(resolve => {
    setTimeout(() => {
      resolve(availableUnits);
    }, 1000);
  });
}

export function getAvailableUnitsByModelId(id: string) {
  const availableUnits = units.filter(unit => {
    const tdUnitIDs = testDrives.map(td => td.unitId);
    return !tdUnitIDs.includes(unit.id);
  });

  const resp = availableUnits.filter(unit => unit.modelId === id);

  return new Promise<typeof resp>(resolve => {
    setTimeout(() => {
      resolve(resp);
    }, 1000);
  });
}
