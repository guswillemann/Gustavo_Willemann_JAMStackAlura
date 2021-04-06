import { useEffect, useState } from 'react';

export default function useForm({
  initicalValues, onSubmit, validateSchema,
}) {
  const [values, setValues] = useState(initicalValues);
  const [isFormDisabled, setIsformDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouchedFields] = useState({});

  useEffect(() => {
    validateSchema(values)
      .then(() => {
        setIsformDisabled(false);
        setErrors({});
      })
      .catch((err) => {
        const fromatedErrors = err.inner.reduce((errorObjectAcc, currentError) => {
          const fieldName = currentError.path;
          const errorMessage = currentError.message;
          return {
            ...errorObjectAcc,
            [fieldName]: errorMessage,
          };
        }, {});
        setErrors(fromatedErrors);
        setIsformDisabled(true);
      });
  }, [values]);

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
    // form validation
    isFormDisabled,
    errors,
    touched,
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');
      setTouchedFields({
        ...touched,
        [fieldName]: true,
      });
    },
  };
}
