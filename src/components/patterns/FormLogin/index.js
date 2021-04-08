import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/forms/useForm';
import loginService from '../../../services/login/loginService';

const loginSchema = yup.object().shape({
  user: yup
    .string()
    .required('"Usuário" é obrigatório')
    .min(3, 'O usuário deve ter ao menos 3 caracteres'),
  password: yup
    .string()
    .required('"Senha" é obrigatória')
    .min(8, 'A senha deve ter ao menos 8 caracteres'),
});

export default function LoginForm({ onSubmit }) {
  const router = useRouter();
  const initialValues = {
    user: '',
    password: '',
  };

  const form = useForm({
    initialValues,
    onSubmit: (values) => {
      form.setIsformDisabled(true);
      loginService.login({
        username: values.user,
        password: values.password,
      })
        .then(() => {
          router.push('/app/profile');
        })
        .catch((err) => {
          const error = err;
          error.name = '';

          const errorMessage = error.toString();
          form.setErrors({ server: errorMessage });
        })
        .finally(() => {
          form.setIsformDisabled(false);
        });
    },
    async validateSchema(values) {
      return loginSchema.validate(values, {
        abortEarly: false,
      });
    },
  });

  return (
    <form id="formLogin" onSubmit={onSubmit || form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="user"
        value={form.values.user}
        onChange={form.handleChange}
        error={form.errors.user}
        isTouched={form.touched.user}
        onBlur={form.handleBlur}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
        error={form.errors.password}
        isTouched={form.touched.password}
        onBlur={form.handleBlur}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
        disabled={form.isFormDisabled}
      >
        Entrar
      </Button>
      {form.errors.server && <span>{form.errors.server}</span>}
    </form>
  );
}

LoginForm.defaultProps = {
  onSubmit: undefined,
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};
