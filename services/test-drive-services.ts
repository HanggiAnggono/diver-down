import {groupBy} from '~/lib/utils';
import {TestDrive} from '~/services';
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

export function createTestDrive(testDrive: Omit<TestDrive, 'id'>) {
  return new Promise<TestDrive>(resolve => {
    setTimeout(() => {
      testDrives.push({
        id: String(testDrives.length + 1),
        ...testDrive,
      });

      resolve(testDrive as TestDrive);
    }, 1000);
  });
}

export function getTestDrives() {
  const resp = testDrives
    .filter(td => td.userId === '1')
    .map(td => {
      return {
        ...td,
        unit: unitsMock.find(u => u.id === td.unitId),
      };
    });

  return new Promise<typeof resp>(resolve => {
    setTimeout(() => {
      resolve(resp);
    }, 1000);
  });
}
