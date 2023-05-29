import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ServicesCalculator } from '../../../features';
import { httpErrors } from '../../../mocks/msw/handlers';
import { server } from '../../../mocks/msw/server/server';
import priceList from '../../../mocks/servicesPriceList.json';
import { matchSnapshot, renderWithStore } from '../../common';

describe('<ServiceCalculator/> - layout', () => {
  it('displays spinner during api call', async () => {
    const { asFragment } = renderWithStore(<ServicesCalculator />);
    await screen.findByRole('status');
    matchSnapshot(asFragment());
  });

  it('hides spinner on api call finish', async () => {
    const { asFragment } = renderWithStore(<ServicesCalculator />);
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    matchSnapshot(asFragment());
  });

  it('displays header', async () => {
    renderWithStore(<ServicesCalculator />);
    await screen.findByRole('heading', { name: 'Kalkulator usług' });
  });

  it('displays year select', async () => {
    renderWithStore(<ServicesCalculator />);
    await screen.findByRole('combobox', { name: 'Wybierz rok' });
  });

  it.each(Object.values(priceList.services))('displays $name checkbox', async ({ name }) => {
    renderWithStore(<ServicesCalculator />);
    await screen.findByRole('checkbox', { name });
  });

  it('displays total price', async () => {
    renderWithStore(<ServicesCalculator />);
    await screen.findByTestId('totalRegularPrice');
  });

  it(`doesn't display discounted price initially`, () => {
    renderWithStore(<ServicesCalculator />);
    expect(screen.queryByTestId('totalDiscountedPrice')).not.toBeInTheDocument();
  });
});

describe('<ServiceCalculator/> - server error', () => {
  beforeEach(() => server.use(httpErrors.servicesPriceList));

  it('displays error message on priceList fetch failure', async () => {
    const { asFragment } = renderWithStore(<ServicesCalculator />);
    await screen.findByText('Wystąpił błąd podczas pobierania danych potrzebnych do kalkulacji');
    matchSnapshot(asFragment());
  });

  it('displays refetch button on priceList fetch failure', async () => {
    renderWithStore(<ServicesCalculator />);
    await screen.findByRole('button', { name: 'Spróbuj ponownie' });
  });

  it('displays spinner during refetch api call', async () => {
    const { asFragment } = renderWithStore(<ServicesCalculator />);
    userEvent.click(await screen.findByRole('button', { name: 'Spróbuj ponownie' }));
    matchSnapshot(asFragment());
    await screen.findByRole('status');
  });

  it('hides spinner on refetch api call finish', async () => {
    renderWithStore(<ServicesCalculator />);
    userEvent.click(await screen.findByRole('button', { name: 'Spróbuj ponownie' }));
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
  });
});
