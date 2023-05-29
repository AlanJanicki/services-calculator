import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ServicesPriceList } from '../models';
import { baseUrl, restApiRoutes } from './routes';

const getQueryUrl = (endpoint: keyof typeof restApiRoutes) =>
  restApiRoutes[endpoint].substring(baseUrl.length);

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getServicesPriceList: builder.query<Record<'priceList', ServicesPriceList>, void>({
      query: () => getQueryUrl('servicesPriceList')
    })
  })
});

export const { useGetServicesPriceListQuery } = api;
export * from './routes';
