import React, { Fragment } from 'react';

import { Card, Checkbox, Select, Spinner } from '../../components';
import { capitalize } from '../../utils';
import * as Styled from './styles/Calculator.styled';
import { useCalculator } from './useCalculator';

export const Calculator = () => {
  const {
    isError,
    isLoading,
    onInvalidService,
    onServiceChange,
    onYearChange,
    refetch,
    services,
    total,
    years
  } = useCalculator();

  if (isLoading) {
    return (
      <Styled.Status>
        <Spinner />
      </Styled.Status>
    );
  }

  if (isError) {
    return (
      <Styled.Status>
        <div>
          <Styled.Error>
            Wystąpił błąd podczas pobierania danych potrzebnych do kalkulacji
          </Styled.Error>
          <Styled.Button onClick={refetch}>Spróbuj ponownie</Styled.Button>
        </div>
      </Styled.Status>
    );
  }

  return (
    <Styled.Form>
      <Card header='Kalkulator usług'>
        <Select id='years' label='Wybierz rok' options={years ?? []} onChange={onYearChange} />
        <Styled.Services>
          {services.map(({ checked, id, name }) => {
            const invalidServiceError = onInvalidService(id);
            return (
              <Fragment key={id}>
                <Checkbox
                  checked={checked}
                  name={name}
                  onChange={(value) => onServiceChange(id, value)}
                />
                {invalidServiceError && (
                  <Styled.Error data-testid='invalidServiceError'>
                    {invalidServiceError}
                  </Styled.Error>
                )}
              </Fragment>
            );
          })}
        </Styled.Services>

        {Object.keys(total)
          .reverse()
          .map((totalType) => {
            const type = totalType as keyof typeof total;
            const isRegularPrice = type === 'regular';
            if (!total[type].show) return;
            return (
              <Styled.Total
                key={type}
                data-testid={`total${capitalize(type)}Price`}
                promo={!isRegularPrice}>
                {`Cena${!isRegularPrice ? ' promocyjna' : ''}: ${total[type].value}`}
              </Styled.Total>
            );
          })}
      </Card>
    </Styled.Form>
  );
};
