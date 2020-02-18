import configureStore from 'redux-mock-store';
import { userLoggedIn } from 'src/components/login/redux/actions/userLoggedIn';
import { authenticationResolved } from '../actions/authenticationResolved';
import onAuthenticationResolvedMiddleware from './onAuthenticationResolvedMiddleware';

it('will dispatch a user logged in action, when successful', () => {
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const action = authenticationResolved({
    success: true,
  });

  onAuthenticationResolvedMiddleware(store)(jest.fn())(action);

  expect(store.getActions()).toHaveLength(1);

  const resultingAction = store.getActions()[0];
  expect(resultingAction.type).toEqual(userLoggedIn.type);
});

it('will not dispatch a user logged in action, when unsuccessful', () => {
  const mockStore = configureStore<{}>();
  const store = mockStore({});

  const action = authenticationResolved({
    success: false,
  });

  onAuthenticationResolvedMiddleware(store)(jest.fn())(action);
  expect(store.getActions()).toHaveLength(0);
});
