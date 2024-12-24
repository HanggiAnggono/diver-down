import {createSlice} from '@reduxjs/toolkit';
import {Unit} from '~/services';

interface TestDriveState {
  unitId: string;
  unit: Unit | null;
}

const initialState: TestDriveState = {
  unitId: '',
  unit: null,
};

const testDriveSlice = createSlice({
  name: 'testDrive',
  initialState,
  reducers: {
    setUnit: (state, action) => {
      state.unitId = action.payload.id;
      state.unit = action.payload;
    },
  },
});

export const {setUnit} = testDriveSlice.actions;

export default testDriveSlice;
