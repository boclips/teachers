import configureStore from 'redux-mock-store';
import { userLoggedIn } from '../../../../components/login/redux/actions/userLoggedIn';
import { authenticationChanged } from '../actions/authenticationChanged';
import authenticationChangedMiddleware from './authenticationChangedMiddleware';

it('will dispatch a user logged in action, when successful', () => {
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const keycloakInstance = 'Keycloak' as any;

  const action = authenticationChanged({
    success: true,
    keycloakInstance,
  });

  authenticationChangedMiddleware(store)(jest.fn())(action);

  expect(store.getActions()).toHaveLength(1);

  const resultingAction = store.getActions()[0];
  expect(resultingAction.type).toEqual(userLoggedIn.type);
  expect(resultingAction.payload).toEqual(keycloakInstance);
});

it('will not dispatch a user logged in action, when unsuccessful', () => {
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const keycloakInstance = 'Keycloak' as any;

  const action = authenticationChanged({
    success: false,
    keycloakInstance,
  });

  authenticationChangedMiddleware(store)(jest.fn())(action);
  expect(store.getActions()).toHaveLength(0);
});
