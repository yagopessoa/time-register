import React, { useState } from 'react';
import { Container } from './styles';

const Checkbox: React.FC = ({ children }) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Container onClick={handleChange}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <label>{children}</label>
    </Container>
  );
};

export default Checkbox;
