import styled from 'styled-components';

import { breakPoints, globalStyles } from '../../../utils';

export const Select = styled.div`
  display: grid;

  label,
  select {
    @media ${breakPoints.lg} {
      font-size: 1.2rem;
    }
  }

  label {
    margin: 0 auto 1rem auto;
  }

  select {
    cursor: pointer;
    padding: 0.1rem 0.5rem;
    ${globalStyles.roundBorders};
  }
`;
