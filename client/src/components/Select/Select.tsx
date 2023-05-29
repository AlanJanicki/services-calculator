import React from 'react';

import * as Styled from './styles/Select.styled';

type Props = {
  id: string;
  label: string;
  onChange: (value: number) => void;
  options: number[];
};

export const Select: React.FC<Props> = ({ id, label, onChange, options }) => (
  <Styled.Select>
    <label htmlFor={id}>{label}</label>
    <select id={id} onChange={(e) => onChange(parseInt(e.target.value))}>
      {options.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  </Styled.Select>
);
