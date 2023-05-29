import { Select } from '../../components';
import priceList from '../../mocks/servicesPriceList.json';

export default {
  component: Select,
  tags: ['autodocs'],
  title: 'Select'
};

export const Default = {
  args: {
    label: 'Wybierz rok',
    options: priceList.years
  }
};
