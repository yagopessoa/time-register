import React, { useEffect, useState, memo, useRef, useContext } from 'react';
import { InputText } from './Styles';
import { IInputTime } from '../interfaces';
import TableContext from './TableContext';

const WAIT_INTERVAL = 500;

const InputTime: React.FC<IInputTime> = ({ name }) => {
  const [value, setValue] = useState<string>('');

  const inputRef = useRef<any>();
  const { registerInput, triggerUpdate } = useContext(TableContext);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = String(event.target.value)
      .replace(':', '')
      ?.replace(/[^0-9]/g, '')
      ?.substring(0, 4);

    if (value.length > 2) {
      value = value.substring(0, 2) + ':' + value.substring(2, 4);
    }

    setValue(value);
  };

  useEffect(() => {
    if (inputRef.current) {
      registerInput({ name, ref: inputRef.current });
    }
  }, [name, registerInput]);

  useEffect(() => {
    const inputTimeout = setTimeout(() => triggerUpdate(), WAIT_INTERVAL);
    return () => clearTimeout(inputTimeout);
  }, [value, triggerUpdate]);

  return (
    <InputText ref={inputRef} onChange={handleInputChange} value={value} />
  );
};

export default memo(InputTime);
