import {createSlice} from '@reduxjs/toolkit';
import {TIME_OPTIONS} from '~/lib/constants';
import {Unit} from '~/services';

interface TestDriveState {
  unitId: string;
  unit: Unit | null;
  day: string | null;
  notifications: Array<{day: number; time: keyof typeof TIME_OPTIONS}>;
}

const initialState: TestDriveState = {
  unitId: '',
  unit: null,
  day: null,
  notifications: [],
};

const testDriveSlice = createSlice({
  name: 'testDrive',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unitId = action.payload.id;
      state.unit = action.payload;
    },
    setDay: (state, action) => {
      state.day = action.payload;
    },
    addNotification: (
      state,
      action: {payload: TestDriveState['notifications'][number]},
    ) => {
      state.notifications.push(action.payload);
    },
    removeNotification: (state, action: {payload: number}) => {
      state.notifications = state.notifications.filter(
        notification => notification.day !== action.payload,
      );
    },
    resetTestDrive: () => initialState,
  },
});

export const {
  setUnit,
  setDay,
  addNotification,
  removeNotification,
  resetTestDrive,
} = testDriveSlice.actions;

export default testDriveSlice;
