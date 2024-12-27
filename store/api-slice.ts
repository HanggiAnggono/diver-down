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
  tagTypes: ['Units', 'UnitsByModelId', 'Unit'],
  endpoints: builder => ({
    getTestDriveUnits: builder.query({
      queryFn: async () => {
        const response = await getTestDriveUnits();
        return {data: response};
      },
      providesTags: ['Units'],
    }),
    getAvailableUnitsByModelId: builder.query({
      queryFn: async (modelId: string) => {
        const response = await getAvailableUnitsByModelId(modelId);
        return {data: response};
      },
      providesTags: [{type: 'UnitsByModelId'}],
    }),
    getUnitById: builder.query({
      queryFn: async (id: string) => {
        const response = await getUnitById(id);
        return {data: response};
      },
      providesTags: ['Unit'],
    }),
    saveTestDrive: builder.mutation({
      queryFn: async (...data: Parameters<typeof ceateTestDrive>) => {
        const response = await ceateTestDrive(...data);
        return {data: response};
      },
      invalidatesTags: ['Unit', 'Units', 'UnitsByModelId'],
    }),
    getCurrentUser: builder.query({
      queryFn: async () => {
        return {data: {name: 'test', id: '1'}};
      },
    }),
  }),
});

export const {
  useGetTestDriveUnitsQuery,
  useGetAvailableUnitsByModelIdQuery,
  useGetUnitByIdQuery,
  useSaveTestDriveMutation,
  useGetCurrentUserQuery,
} = apiSlice;
export default apiSlice;
