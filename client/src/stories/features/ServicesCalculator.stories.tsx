import { expect } from '@storybook/jest';
import { Meta, StoryFn } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { mswDecorator } from 'msw-storybook-addon';
import React from 'react';
import { Provider } from 'react-redux';

import { ServicesCalculator } from '../../features';
import { handlers, httpErrors } from '../../mocks/msw/handlers';
import priceList from '../../mocks/servicesPriceList.json';
import { setupStore } from '../../store';
import { getTotal } from '../../utils';

const { services } = priceList;

export default {
  component: ServicesCalculator,
  parameters: {
    msw: {
      handlers
    }
  },
  title: 'ServicesCalculator'
};

const Template = {
  decorators: [
    (Story: StoryFn) => (
      <Provider store={setupStore()}>
        <Story />
      </Provider>
    ),
    mswDecorator
  ]
} as Meta;

export const Default = { ...Template };
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  for (const { name } of services) {
    userEvent.click(await canvas.findByRole('checkbox', { name }));
  }

  await waitFor(async () => {
    expect(await canvas.findByTestId('totalRegularPrice')).toHaveTextContent(
      getTotal(services, 0).toString()
    );
  });
};

export const HttpError = { ...Template };
HttpError.parameters = {
  msw: {
    handlers: [httpErrors.servicesPriceList]
  }
};
