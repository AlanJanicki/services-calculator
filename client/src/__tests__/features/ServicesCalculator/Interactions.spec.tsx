import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { ServicesCalculator } from '../../../features';
import priceList from '../../../mocks/servicesPriceList.json';
import { Service } from '../../../models';
import { getInvalidServiceInfo, getTotal } from '../../../utils/';
import { renderWithStore } from '../../common';

describe('<ServiceCalculator/> - interactions', () => {
  const { discountBundles, services, years } = priceList;

  const discountBundleWithDifferentYearPrices =
    discountBundles[0] as (typeof discountBundles)[0] & {
      prices: number[];
    };
  const discountBundleWithFixedPrice = discountBundles[1] as (typeof discountBundles)[1] & {
    fixedPrice: number;
  };

  const setYear = async (year: number) =>
    userEvent.selectOptions(
      await screen.findByRole('combobox', { name: 'Wybierz rok' }),
      year.toString()
    );

  const selectServices = async (servicesToSelect: Service[] = services) => {
    for (const { name } of servicesToSelect) {
      userEvent.click(await screen.findByRole('checkbox', { name }));
    }
  };

  const makeIncompleteChoice = async () => {
    const choice = services[3];
    await userEvent.click(await screen.findByRole('checkbox', { name: choice.name }));
    return choice;
  };

  const getServiceById = (serviceId: number) =>
    services.find(({ id }) => id === serviceId) as Service;

  const getYearIndex = (year: number) => years.indexOf(year);

  const getDiscountedServices = (servicesIds: number[]) => servicesIds.map(getServiceById);

  const getRegularTotalOfAllServices = (year: number) =>
    getTotal(services, getYearIndex(year)).toString();

  const getComplementaryServicesOfSelectedIncompleteChoice = ({
    complementaryServicesIds
  }: Service) => complementaryServicesIds?.map(getServiceById) as Service[];

  it.each(years)('displays correct regular total for all services for year %s', async (year) => {
    renderWithStore(<ServicesCalculator />);
    await setYear(year);
    await selectServices();
    expect(screen.getByTestId('totalRegularPrice')).toHaveTextContent(
      getRegularTotalOfAllServices(year)
    );
  });

  it('recalculates correct regular total for all services on year change', async () => {
    renderWithStore(<ServicesCalculator />);
    await selectServices();
    setYear(years[1]);
    expect(await screen.findByTestId('totalRegularPrice')).toHaveTextContent(
      getRegularTotalOfAllServices(years[1])
    );
  });

  it('hides regular total on incomplete choice', async () => {
    renderWithStore(<ServicesCalculator />);
    await makeIncompleteChoice();
    expect(screen.queryByTestId('totalRegularPrice')).not.toBeInTheDocument();
  });

  it('shows regular total on unselecting incomplete choice', async () => {
    renderWithStore(<ServicesCalculator />);
    await makeIncompleteChoice();
    await makeIncompleteChoice();
    screen.getByTestId('totalRegularPrice');
  });

  it('shows regular total on selecting complementary services, after making incomplete choice', async () => {
    renderWithStore(<ServicesCalculator />);
    const incompleteChoice = await makeIncompleteChoice();
    await selectServices(getComplementaryServicesOfSelectedIncompleteChoice(incompleteChoice));
    screen.getByTestId('totalRegularPrice');
  });

  it.each(years)('displays correct discounted total for year %s', async (year) => {
    renderWithStore(<ServicesCalculator />);
    const { prices, servicesIds } = discountBundleWithDifferentYearPrices;
    await setYear(year);
    await selectServices(getDiscountedServices(servicesIds));
    expect(screen.getByTestId('totalDiscountedPrice')).toHaveTextContent(
      prices[getYearIndex(year)].toString()
    );
  });

  it('recalculates correct discounted total on year change', async () => {
    const { prices, servicesIds } = discountBundleWithDifferentYearPrices;
    renderWithStore(<ServicesCalculator />);
    await selectServices(getDiscountedServices(servicesIds));
    setYear(years[1]);
    expect(await screen.findByTestId('totalDiscountedPrice')).toHaveTextContent(
      prices[1].toString()
    );
  });

  it('displays correct discounted total if discount set has fixed price across years', async () => {
    renderWithStore(<ServicesCalculator />);
    const { fixedPrice, servicesIds } = discountBundleWithFixedPrice;
    await selectServices(getDiscountedServices(servicesIds));
    expect(screen.getByTestId('totalDiscountedPrice')).toHaveTextContent(fixedPrice.toString());
  });

  it.each(years)(
    'applies only highest discount on selecting all services and thus causing overlapping discounts - for year %s',
    async (year) => {
      const { prices, servicesIds } = discountBundleWithDifferentYearPrices;
      const yearIndex = getYearIndex(year);
      renderWithStore(<ServicesCalculator />);
      await setYear(year);
      await selectServices();
      const [regularTotal, regularPriceOfDiscountedServices] = [...Array(2)].map((_, i) =>
        getTotal(i === 0 ? services : getDiscountedServices(servicesIds), yearIndex)
      );
      expect(screen.getByTestId('totalDiscountedPrice')).toHaveTextContent(
        (regularTotal - regularPriceOfDiscountedServices + prices[yearIndex]).toString()
      );
    }
  );

  it('hides discounted total on incomplete choice', async () => {
    renderWithStore(<ServicesCalculator />);
    await makeIncompleteChoice();
    expect(screen.queryByTestId('totalDiscountedPrice')).not.toBeInTheDocument();
  });

  it('hides discounted total on unselecting incomplete choice, with no discounted services selected', async () => {
    renderWithStore(<ServicesCalculator />);
    await makeIncompleteChoice();
    await makeIncompleteChoice();
    expect(screen.queryByTestId('totalDiscountedPrice')).not.toBeInTheDocument();
  });

  it('shows discounted total on selecting complementary services, after making incomplete choice', async () => {
    renderWithStore(<ServicesCalculator />);
    const incompleteChoice = await makeIncompleteChoice();
    const { servicesIds } = discountBundleWithDifferentYearPrices;
    await selectServices(
      getDiscountedServices(servicesIds.filter((id) => id !== incompleteChoice.id))
    );
    screen.getByTestId('totalDiscountedPrice');
  });

  it('shows missing services', async () => {
    renderWithStore(<ServicesCalculator />);
    const incompleteChoice = await makeIncompleteChoice();
    const complementaryServices =
      getComplementaryServicesOfSelectedIncompleteChoice(incompleteChoice);
    screen.getByText(getInvalidServiceInfo(complementaryServices));
  });

  it('hides missing services on unselecting incomplete choice', async () => {
    renderWithStore(<ServicesCalculator />);
    await makeIncompleteChoice();
    await makeIncompleteChoice();
    expect(screen.queryByTestId('invalidServiceError')).not.toBeInTheDocument();
  });

  it('hides missing services on selecting complementary services', async () => {
    renderWithStore(<ServicesCalculator />);
    const incompleteChoice = await makeIncompleteChoice();
    await selectServices(getComplementaryServicesOfSelectedIncompleteChoice(incompleteChoice));
    expect(screen.queryByTestId('invalidServiceError')).not.toBeInTheDocument();
  });
});
