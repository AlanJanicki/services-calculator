import { Service } from '../models';

export const getServicePrice = ({ fixedPrice, prices }: Service, yearIndex: number) =>
  fixedPrice ?? (prices ?? [])[yearIndex];

export const getTotal = (services: Service[], yearIndex: number) =>
  services.reduce((acc, next) => acc + getServicePrice(next, yearIndex), 0);

export const getInvalidServiceInfo = (missingComplementaryServices: Service[]) =>
  `Konieczne jest jeszcze zakupienie usług: ${missingComplementaryServices
    .map(({ name }) => name)
    .join(', ')}`;
