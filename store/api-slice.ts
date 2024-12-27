import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {fetchCars, getUnitById} from '~/services/car-service';
import {
  ceateTestDrive,
  getAvailableUnitsByModelId,
  getTestDriveUnits,
} from '~/services/test-drive-services';

const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
  endpoints: builder => ({
    getCars: builder.query({
      queryFn: async () => {
        const response = await fetchCars();
        return {data: response};
      },
    }),
    getTestDriveUnits: builder.query({
      queryFn: async () => {
        const response = await getTestDriveUnits();
        return {data: response};
      },
    }),
    getAvailableUnitsByModelId: builder.query({
      queryFn: async (modelId: string) => {
        const response = await getAvailableUnitsByModelId(modelId);
        return {data: response};
      },
    }),
    getUnitById: builder.query({
      queryFn: async (id: string) => {
        const response = await getUnitById(id);
        return {data: response};
      },
    }),
    saveTestDrive: builder.mutation({
      queryFn: async (...data: Parameters<typeof ceateTestDrive>) => {
        const response = await ceateTestDrive(...data);
        return {data: response};
      },
    }),
    getCurrentUser: builder.query({
      queryFn: async () => {
        return {data: {name: 'test', id: '1'}};
      },
    }),
  }),
});

export const {
  useGetCarsQuery,
  useGetTestDriveUnitsQuery,
  useGetAvailableUnitsByModelIdQuery,
  useGetUnitByIdQuery,
  useSaveTestDriveMutation,
  useGetCurrentUserQuery,
} = apiSlice;
export default apiSlice;
