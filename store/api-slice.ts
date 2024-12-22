import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {fetchCars} from '~/services/car-service';
import {getTestDrives} from '~/services/test-drive-services';

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
    getTestDrives: builder.query({
      queryFn: async () => {
        const response = await getTestDrives();
        return {data: response};
      },
    }),
  }),
});

export const {useGetCarsQuery, useGetTestDrivesQuery} = apiSlice;
export default apiSlice;
