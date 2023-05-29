import { useEffect, useState } from 'react';

import { useGetServicesPriceListQuery } from '../../api';
import { DiscountBundle, InvalidService, Service, ServicesPriceList } from '../../models';
import { getInvalidServiceInfo, getServicePrice, getTotal } from '../../utils/';

export const useCalculator = () => {
  const { data, isError, isLoading, refetch } = useGetServicesPriceListQuery();
  const [services, setServices] = useState<(Service & { checked: boolean })[]>([]);
  const [invalidServices, setInvalidServices] = useState<InvalidService[]>([]);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [total, setTotal] = useState({ discounted: 0, regular: 0 });

  const selectedServices = services.filter(({ checked }) => checked);
  const selectedServicesIds = selectedServices.map(({ id }) => id);

  useEffect(() => {
    if (!data?.priceList) return;
    setServices(
      data.priceList.services.map((service) => ({
        ...service,
        checked: false
      }))
    );
  }, [data]);

  useEffect(() => {
    onValidation();
    onTotalChange();
  }, [services, selectedYearIndex]);

  const onValidation = () => {
    const invalidServices = selectedServices.reduce((acc, { complementaryServicesIds, id }) => {
      if (!complementaryServicesIds?.length) return acc;

      const serviceWithMissingComplementaryOnes = complementaryServicesIds.reduce((acc, next) => {
        if (selectedServicesIds.includes(next)) return acc;

        return {
          id,
          missingComplementaryServices: [
            ...(acc.missingComplementaryServices ?? []),
            services.find(({ id }) => id === next)
          ].filter((service) => typeof service !== 'undefined') as Service[]
        };
      }, {} as InvalidService);

      if (!Object.keys(serviceWithMissingComplementaryOnes).length) return acc;
      return [...acc, serviceWithMissingComplementaryOnes];
    }, [] as InvalidService[]);

    setInvalidServices(invalidServices);
  };

  const onTotalChange = () => {
    const regular = getTotal(selectedServices, selectedYearIndex);
    const discounted = getLowestDiscountedTotal(regular);

    setTotal({
      discounted,
      regular
    });
  };

  const onServiceChange = (serviceId: number, checked: boolean) => {
    const update = [...services];
    update[services.findIndex(({ id }) => id === serviceId)].checked = checked;
    setServices(update);
  };

  const onYearChange = (year: number) =>
    setSelectedYearIndex(data?.priceList.years.indexOf(year) ?? 0);

  const onInvalidService = (serviceId: number) => {
    const invalidService = invalidServices.find(({ id }) => id === serviceId);
    if (!invalidService) return;
    return getInvalidServiceInfo(invalidService.missingComplementaryServices);
  };

  const getLowestDiscountedTotal = (totalRegular: number) => {
    const availableDiscountBundles = data?.priceList.discountBundles.reduce((acc, next) => {
      if (next.servicesIds.every((id) => selectedServicesIds.includes(id))) return [...acc, next];
      return acc;
    }, [] as ServicesPriceList['discountBundles']);

    if (!availableDiscountBundles?.length) return 0;

    const getDiscount = (discountBundle: DiscountBundle) =>
      getTotal(
        selectedServices.filter(({ id }) => discountBundle.servicesIds.includes(id)),
        selectedYearIndex
      ) - getServicePrice(discountBundle, selectedYearIndex);

    const highestDiscount = availableDiscountBundles.reduce((acc, next) => {
      const nextDiscount = getDiscount(next);
      if (acc > nextDiscount) return acc;
      return nextDiscount;
    }, getDiscount(availableDiscountBundles[0]));

    return totalRegular - highestDiscount;
  };

  const getTotalValue = (price: number) => `${price} ${data?.priceList.currency}`;

  const { discounted, regular } = total;

  return {
    invalidServices,
    isError,
    isLoading,
    onInvalidService,
    onServiceChange,
    onYearChange,
    refetch,
    services,
    total: {
      discounted: {
        show: !invalidServices.length && !!discounted,
        value: getTotalValue(discounted)
      },
      regular: {
        show: !invalidServices.length,
        value: getTotalValue(regular)
      }
    },
    years: data?.priceList.years
  };
};
