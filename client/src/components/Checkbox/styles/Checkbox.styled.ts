import styled from 'styled-components';

import { breakPoints } from '../../../utils';

const { lg } = breakPoints;

export const Checkbox = styled.div`
  height: 2rem;
  margin-top: 0.3rem;
  display: flex;
  align-items: center;

  @media ${lg} {
    margin-top: 0.5rem;
  }

  input,
  label {
    cursor: pointer;
  }

  input {
    @media ${lg} {
      height: 1.2rem;
      aspect-ratio: 1;
    }
  }

  label {
    padding-left: 1rem;

    @media ${lg} {
      font-size: 1.2rem;
    }
  }
`;
