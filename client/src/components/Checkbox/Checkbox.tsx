import React from 'react';

import * as Styled from './styles/Checkbox.styled';

type Props = {
  checked: boolean;
  name: string;
  onChange: (checked: boolean) => void;
};

export const Checkbox: React.FC<Props> = ({ checked, name, onChange }) => (
  <Styled.Checkbox>
    <input checked={checked} id={name} type='checkbox' onChange={() => onChange(!checked)} />
    <label htmlFor={name}>{name}</label>
  </Styled.Checkbox>
);
