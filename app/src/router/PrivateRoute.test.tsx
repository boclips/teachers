import { mount } from 'enzyme';
import Keycloak from 'keycloak-js';
import { KeycloakInstance } from 'keycloak-js';
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Store } from 'redux';
import configureStore from 'redux-mock-store';
import { By } from '../../test-support/By';
import { LoginState } from '../State';
import PrivateRoute from './PrivateRoute';

const mockStore = configureStore<LoginState>();
jest.mock('boclips-js-security');

class TestComponent extends PureComponent {
  public render(): React.ReactNode {
    return <span data-qa="restricted-content" />;
  }
}

function render(store: Store<any>) {
  return mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/']}>
        <PrivateRoute path="/" component={TestComponent} />
      </MemoryRouter>
    </Provider>,
  );
}

describe('when not logged in', () => {
  test('does not render component', () => {
    const wrapper = render(
      mockStore({
        login: null,
      }),
    );

    const content = wrapper.find(By.dataQa('restricted-content'));
    expect(content).not.toExist();
  });
});

describe('when logged in', () => {
  test('Renders component', () => {
    const login: KeycloakInstance = Keycloak();
    login.authenticated = true;

    const wrapper = render(mockStore({ login }));

    const content = wrapper.find(By.dataQa('restricted-content'));
    expect(content).toExist();
  });
});
