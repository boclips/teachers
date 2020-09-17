import configureStore from 'redux-mock-store';
import { failedAuthentication } from 'src/app/redux/authentication/actions/failedAuthentication';
import onAuthenticationResolvedMiddleware from 'src/app/redux/authentication/middleware/onAuthenticationResolvedMiddleware';
import { userLoggedIn } from '../../../../components/login/redux/actions/userLoggedIn';
import { successfulAuthentication } from '../actions/successfulAuthentication';

it('will dispatch a user logged in action, when successful', () => {
  const mockStore = configureStore<{}>([...onAuthenticationResolvedMiddleware]);
  const store = mockStore({});
  const action = successfulAuthentication();

  store.dispatch(action);

  expect(store.getActions()).toHaveLength(2);

  const resultingAction = store.getActions()[1];
  expect(resultingAction.type).toEqual(userLoggedIn.type);
});

it('will not dispatch a user logged in action, when unsuccessful', () => {
  const mockStore = configureStore<{}>([...onAuthenticationResolvedMiddleware]);
  const store = mockStore({});
  const action = failedAuthentication();

  store.dispatch(action);

  expect(store.getActions()).toHaveLength(1);
});
