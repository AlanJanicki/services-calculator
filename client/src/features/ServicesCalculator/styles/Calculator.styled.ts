import styled from 'styled-components';

import { breakPoints, globalStyles } from '../../../utils';
const { lg } = breakPoints;

type TotalProps = {
  promo?: boolean;
};

export const Status = styled.div`
  padding-top: 3rem;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
`;

export const Form = styled.form`
  margin-top: 2rem;
`;

export const Services = styled.div`
  margin: 1rem 0;

  @media ${lg} {
    margin-top: 1.2rem;
  }
`;

export const Error = styled.span`
  color: #dd3546;

  @media ${lg} {
    font-size: 1.2rem;
  }
`;

export const Total = styled.p<TotalProps>`
  margin-bottom: 1rem;
  color: ${({ promo }) => (promo ? '#218838' : '#000')};
  font-size: 1.2rem;
  font-weight: bold;

  @media ${lg} {
    margin: 1.2rem 0 0 0;
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
  margin: 2rem auto 0 auto;
  padding: 0.5rem;
  width: 50%;
  background-color: #0f7bff;
  ${globalStyles.roundBorders}
  border: 1px solid transparent;
  color: #fff;
  font-weight: 400;

  @media ${lg} {
    font-size: 1.2rem;
  }
`;
