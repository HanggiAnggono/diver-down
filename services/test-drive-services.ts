import {groupBy} from '~/lib/utils';
import {models, testDrives, units as unitsMock} from '~/services/mock';

export function getTestDriveUnits() {
  const resp = Object.entries(groupBy(unitsMock, u => u.modelId)).map(
    ([modelId, units]) => {
      const availableUnits = units.filter(unit => {
        const tdUnitIDs = testDrives.map(td => td.unitId);
        return !tdUnitIDs.includes(unit.id);
      });

      return {
        modelId,
        availableUnits: availableUnits.length,
        model: units[0].model,
        units,
      };
    },
  );

  return new Promise<typeof resp>(resolve => {
    setTimeout(() => {
      resolve(resp);
    }, 1000);
  });
}

export function getAvailableUnitsByModelId(id: string) {
  const units = unitsMock.filter(u => u.modelId === id);

  const availableUnitIds = units
    .filter(unit => {
      const tdUnitIDs = testDrives.map(td => td.unitId);
      return !tdUnitIDs.includes(unit.id);
    })
    .map(unit => unit.id);

  const resp = units.map(unit => {
    const availability = availableUnitIds.includes(unit.id);
    console.log({availability});
    return {
      ...unit,
      availability,
    };
  });

  return new Promise<typeof resp>(resolve => {
    setTimeout(() => {
      resolve(resp);
    }, 1000);
  });
}
