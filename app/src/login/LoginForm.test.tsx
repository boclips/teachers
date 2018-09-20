import { mount } from 'enzyme';
import React from 'react';
import { findOne, login } from '../../test-support/enzymeHelpers';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('calls on submit with username and password', () => {
    const mockOnSubmit = jest.fn();
    const wrapper = mount(<LoginForm onSubmit={mockOnSubmit} />);

    login(wrapper, 'username', 'password');

    expect(findOne(wrapper, 'login-button', 'button')).not.toBeDisabled();
    expect(mockOnSubmit).toHaveBeenCalledWith({
      username: 'username',
      password: 'password',
    });
  });

  test('disables button when no username', () => {
    const mockOnSubmit = jest.fn();
    const wrapper = mount(<LoginForm onSubmit={mockOnSubmit} />);

    login(wrapper, '', 'password');

    expect(findOne(wrapper, 'login-button', 'button')).toBeDisabled();
  });

  test('disables button when no password', () => {
    const mockOnSubmit = jest.fn();
    const wrapper = mount(<LoginForm onSubmit={mockOnSubmit} />);

    login(wrapper, 'username', '');

    expect(findOne(wrapper, 'login-button', 'button')).toBeDisabled();
  });
});
