import '@testing-library/jest-dom';
import 'jest-styled-components';

import { api } from './api';
import { server } from './mocks/msw/server/server';
import { setupStore } from './store';

beforeAll(() => server.listen());

beforeEach(() => {
  setupStore().dispatch(api.util.resetApiState());
  server.resetHandlers();
});

afterAll(() => server.close());
