import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import By from '../../../../test-support/By';
import {
  LinksStateValueFactory,
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import { requestSsoAuthentication } from '../../../app/redux/authentication/actions/requestSsoAuthentication';
import CreateAccountForm from './CreateAccountForm';

jest.mock('boclips-js-security');

describe('create account form', () => {
  let wrapper;
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample(),
    links: LinksStateValueFactory.sample(),
  });
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <CreateAccountForm />
        </Router>
      </Provider>,
    );
  });

  describe('Google SSO button', () => {
    it('when the button is clicked, the identity provider is called', () => {
      const googleSsoButton = wrapper
        .find(By.dataQa('google-button'))
        .hostNodes();

      googleSsoButton.first().simulate('click');

      expect(store.getActions()).toContainEqual(
        requestSsoAuthentication('google'),
      );
    });
  });

  describe('Microsoft SSO button', () => {
    it('when the button is clicked, the identity provider is called', () => {
      const microsoftSsoButton = wrapper
        .find(By.dataQa('microsoft-button'))
        .hostNodes();

      microsoftSsoButton.first().simulate('click');

      expect(store.getActions()).toContainEqual(
        requestSsoAuthentication('microsoft'),
      );
    });
  });
});

describe(`password validation`, () => {
  const validPassword = 'Aa123456';
  let wrapper;
  beforeEach(() => {
    wrapper = renderWithBoclipsStore(
      <Form>
        <CreateAccountForm />
      </Form>,
      MockStoreFactory.sampleState(),
    );
  });

  it('validates good password removing validation warnings', () => {
    fireEvent.change(wrapper.getByPlaceholderText('Enter your password'), {
      target: { value: validPassword },
    });

    expect(wrapper.queryByTestId('password-error')).toBeNull();
    expect(wrapper.queryByTestId('password-success')).toBeNull();
  });

  it('validates short password', async () => {
    fireEvent.change(wrapper.getByPlaceholderText('Enter your password'), {
      target: { value: 'Aa123' },
    });

    expect(await wrapper.findAllByTestId('password-error')).toHaveLength(1);
    expect(await wrapper.findAllByTestId('password-success')).toHaveLength(3);
  });

  it('validates password without uppercase', async () => {
    fireEvent.change(wrapper.getByPlaceholderText('Enter your password'), {
      target: { value: validPassword.toLocaleLowerCase() },
    });

    expect(await wrapper.findAllByTestId('password-error')).toHaveLength(1);
    expect(await wrapper.findAllByTestId('password-success')).toHaveLength(3);
  });

  it('validates password without lowercase', async () => {
    fireEvent.change(wrapper.getByPlaceholderText('Enter your password'), {
      target: { value: validPassword.toLocaleUpperCase() },
    });

    expect(await wrapper.findAllByTestId('password-error')).toHaveLength(1);
    expect(await wrapper.findAllByTestId('password-success')).toHaveLength(3);
  });

  it('validates password without numbers', async () => {
    fireEvent.change(wrapper.getByPlaceholderText('Enter your password'), {
      target: { value: 'AAAaaaaaa' },
    });
    expect(await wrapper.findAllByTestId('password-error')).toHaveLength(1);
    expect(await wrapper.findAllByTestId('password-success')).toHaveLength(3);
  });
});
