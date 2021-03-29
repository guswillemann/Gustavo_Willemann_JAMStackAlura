import React from 'react';
import { useRouter } from 'next/router';
import Button from '../../commons/Button';
import TextField from '../../forms/TextField';
import useForm from '../../../infra/hooks/forms/useForm';
import loginService from '../../../services/login/loginService';

export default function LoginForm() {
  const router = useRouter();
  const initicalValues = {
    user: '',
    password: '',
  };

  const form = useForm({
    initicalValues,
    onSubmit: (values) => {
      loginService.login({
        username: values.user,
        password: values.password,
      })
        .then(() => {
          router.push('/app/profile');
        });
    },
  });

  return (
    <form id="formLogin" onSubmit={form.handleSubmit}>
      <TextField
        placeholder="Usuário"
        name="user"
        value={form.values.user}
        onChange={form.handleChange}
      />
      <TextField
        placeholder="Senha"
        name="password"
        type="password"
        value={form.values.password}
        onChange={form.handleChange}
      />

      <Button
        type="submit"
        variant="primary.main"
        margin={{
          xs: '0 auto',
          md: 'initial',
        }}
        fullWidth
      >
        Entrar
      </Button>
    </form>
  );
}
