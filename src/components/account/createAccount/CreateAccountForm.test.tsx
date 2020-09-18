import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { Form } from 'antd';
import { renderWithBoclipsStore } from 'test-support/renderWithStore';
import eventually from 'src/../test-support/eventually';
import { createAccount } from 'src/services/account/createAccount';
import { authenticationRequiredFirstTime } from 'src/app/redux/authentication/actions/authenticationRequiredFirstTime';
import {
  LinksStateValueFactory,
  MockStoreFactory,
  RouterFactory,
} from 'test-support/factories';
import { requestSsoAuthentication } from 'src/app/redux/authentication/actions/requestSsoAuthentication';
import By from '../../../../test-support/By';
import CreateAccountForm from './CreateAccountForm';

jest.mock('boclips-js-security');

jest.mock('src/services/account/createAccount');
const mockCreateAccount = createAccount as jest.Mock;

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

  describe('Create account submit', () => {
    it('dispatches request onboarding action', async () => {
      const form = render(
        <Provider store={store}>
          <Router>
            <CreateAccountForm />
          </Router>
        </Provider>,
      );
      fireEvent.change(form.getByPlaceholderText('Enter your email'), {
        target: { value: 'test@test.com' },
      });
      fireEvent.change(form.getByPlaceholderText('Enter your password'), {
        target: { value: 'Aa123456' },
      });
      const button = form
        .getByText('Create account', { selector: 'span' })
        .closest('button');

      mockCreateAccount.mockReturnValue(Promise.resolve(true));
      fireEvent.click(button);

      await eventually(() => {
        expect(store.getActions()).toContainEqual(
          authenticationRequiredFirstTime({
            username: 'test@test.com',
            password: 'Aa123456',
          }),
        );
      });
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
