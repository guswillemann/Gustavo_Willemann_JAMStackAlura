import React from 'react';
import user from '@testing-library/user-event';
import FormLogin from './index';
import {
  render, act, screen, waitFor,
} from '../../../infra/test/testUtils';

const onSubmit = jest.fn((event) => {
  event.preventDefault();
});

describe('<FromLogin />', () => {
  describe('when form fields are valid', () => {
    test('complete the submission', async () => {
      await act(async () => render(
        <FormLogin
          onSubmit={onSubmit}
        />,
      ));

      const submitButton = screen.getByRole('button');
      const inputUser = screen.getByPlaceholderText('Usuário');
      const inputPassword = screen.getByPlaceholderText('Senha');

      expect(submitButton).toBeDisabled();
      user.type(inputUser, 'someusername');
      user.type(inputPassword, 'somepassword');
      await waitFor(() => {
        expect(inputUser).toHaveValue('someusername');
        expect(inputPassword).toHaveValue('somepassword');
      });
      expect(submitButton).not.toBeDisabled();
      user.click(submitButton);
      expect(onSubmit).toBeCalledTimes(1);
    });
  });

  describe('when form fields are invalid', () => {
    test('displays the respective error', async () => {
      render(<FormLogin onSubmit={onSubmit} />);

      const inputUser = screen.getByPlaceholderText('Usuário');

      inputUser.focus();
      inputUser.blur();

      await waitFor(() => screen.getByRole('alert'));

      expect(screen.getByRole('alert')).toHaveTextContent('O usuário deve ter ao menos 3 caracteres');
    });
  });
});
