import React from 'react';

import { Select } from '../../components';
import priceList from '../../mocks/servicesPriceList.json';
import { renderWithSnapshot } from '../common';

describe('<Select/>', () => {
  it('matches snapshot', () =>
    renderWithSnapshot(
      <Select id='years' label='Wybierz rok' options={priceList.years} onChange={jest.fn} />
    ));
});
