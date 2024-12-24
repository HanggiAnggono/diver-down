import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {fetchCars} from '~/services/car-service';
import {
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
  }),
});

export const {
  useGetCarsQuery,
  useGetTestDriveUnitsQuery,
  useGetAvailableUnitsByModelIdQuery,
} = apiSlice;
export default apiSlice;
