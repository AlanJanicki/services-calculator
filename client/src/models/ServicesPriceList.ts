export type ServicesPriceList = {
  currency: string;
  discountBundles: DiscountBundle[];
  services: Service[];
  years: number[];
};

export type Service = {
  complementaryServicesIds?: number[];
  fixedPrice?: number;
  id: number;
  name: string;
  prices?: number[];
};

export type DiscountBundle = Service & { servicesIds: number[] };

export type InvalidService = { id: number; missingComplementaryServices: Service[] };
