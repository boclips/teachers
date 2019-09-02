import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { By } from '../../../../test-support/By';
import {
  LinksFactory,
  MockStoreFactory,
  RouterFactory,
} from '../../../../test-support/factories';
import { requestSsoAuthentication } from '../../../app/redux/authentication/actions/requestSsoAuthentication';
import CreateAccountForm from './CreateAccountForm';

jest.mock('boclips-js-security');

describe('Google SSO button', () => {
  let wrapper;
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample(),
    links: LinksFactory.sample(),
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

  it('when the button is clicked, the identity provider is called', () => {
    const googleSsoButton = wrapper
      .find(By.dataQa('google-button'))
      .hostNodes();

    googleSsoButton.simulate('click');

    expect(store.getActions()).toContainEqual(
      requestSsoAuthentication('google'),
    );
  });
});

describe('Microsoft SSO button', () => {
  let wrapper;
  const store = MockStoreFactory.sample({
    router: RouterFactory.sample(),
    links: LinksFactory.sample(),
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

  it('when the button is clicked, the identity provider is called', () => {
    const microsoftSsoButton = wrapper
      .find(By.dataQa('microsoft-button'))
      .hostNodes();

    microsoftSsoButton.simulate('click');

    expect(store.getActions()).toContainEqual(
      requestSsoAuthentication('microsoft'),
    );
  });
});
