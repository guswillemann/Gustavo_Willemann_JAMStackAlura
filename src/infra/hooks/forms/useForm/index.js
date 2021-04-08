import { useEffect, useState } from 'react';

export default function useForm({
  initialValues, onSubmit, validateSchema,
}) {
  const [values, setValues] = useState(initialValues);
  const [isFormDisabled, setIsformDisabled] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouchedFields] = useState({});

  async function validateValues(currentValues) {
    try {
      await validateSchema(currentValues);
      setErrors({});
      setIsformDisabled(false);
    } catch (err) {
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
    }
  }

  useEffect(() => {
    validateValues(values);
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
    setIsformDisabled,
    errors,
    setErrors,
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
