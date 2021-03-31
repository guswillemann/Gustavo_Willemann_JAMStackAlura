import React from 'react';
import { render, screen } from '../../../infra/test/testUtils';

import TextField from './index';

describe('<TextField />', () => {
  test('renders component', () => {
    render(
      <TextField
        placeholder="placeholder"
        value="textField test value"
        onChange={() => {}}
        name="name"
      />,
    );

    const textField = screen.getByPlaceholderText(/placeholder/i);
    expect(textField).toMatchSnapshot();
  });
});
