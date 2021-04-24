import { useState } from 'react';

export const useField = (name, type = 'text') => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, name, value, onChange };
};