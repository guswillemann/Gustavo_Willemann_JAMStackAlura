import { useState } from 'react';

export default function useForm({ initicalValues, onSubmit }) {
  const [values, setValues] = useState(initicalValues);

  return {
    values,
    handleSubmit(event) {
      event.preventDefault();
      onSubmit(values);
    },
    handleChange(event) {
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;

      setValues((curretValues) => ({
        ...curretValues,
        [fieldName]: value,
      }));
    },
  };
}
