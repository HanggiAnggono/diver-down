import {createSlice} from '@reduxjs/toolkit';

interface TestDriveState {
  unitId: string;
}

const initialState: TestDriveState = {
  unitId: '',
};

const testDriveSlice = createSlice({
  name: 'testDrive',
  initialState,
  reducers: {
    setUnitId: (state, action) => {
      state.unitId = action.payload;
    },
  },
});

export const {setUnitId} = testDriveSlice.actions;

export default testDriveSlice;
