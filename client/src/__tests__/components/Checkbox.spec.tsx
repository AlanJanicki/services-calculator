import React from 'react';

import { Checkbox } from '../../components';
import { renderWithSnapshot } from '../common';

describe('<Checkbox/>', () => {
  it('matches snapshot', () =>
    renderWithSnapshot(<Checkbox checked={false} name='Internet' onChange={jest.fn} />));
});
