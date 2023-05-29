import { rest } from 'msw';

import { restApiRoutes } from '../../api';
import priceList from '../servicesPriceList.json';

const { servicesPriceList } = restApiRoutes;

export const httpErrors = {
  servicesPriceList: rest.get(servicesPriceList, (_, res, ctx) => res(ctx.status(500)))
};

export const handlers = [
  rest.get(servicesPriceList, (_, res, ctx) => res(ctx.status(200), ctx.json({ priceList })))
];
