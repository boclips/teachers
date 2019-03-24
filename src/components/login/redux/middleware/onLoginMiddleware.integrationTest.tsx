import configureStore from 'redux-mock-store';
import ApiStub from '../../../../../test-support/ApiStub';
import eventually from '../../../../../test-support/eventually';
import KeycloakInstanceFake from '../../../../../test-support/KeycloakInstanceFake';
import { userResponse } from '../../../../../test-support/video-service-responses';
import { Link, RawLink } from '../../../../types/Link';
import { registerAnalytics } from '../actions/registerAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';
import onStoreLoginMiddleware from './onLoginMiddleware';
import onRegisterAnalyticsMiddleware from './onRegisterAnalyticsMiddleware';

jest.mock('../../../searchBar/redux/dispatchSearchVideoAction');
jest.mock('../../../../services/analytics/AnalyticsFactory');

const mockStore = configureStore<{}>([
  onStoreLoginMiddleware,
  onRegisterAnalyticsMiddleware,
]);
const store = mockStore({});

describe('on store login', () => {
  beforeEach(() => {
    new ApiStub().fetchUser(userResponse());

    store.dispatch(
      userLoggedIn(
        new KeycloakInstanceFake({
          userId: 'user-id',
        }),
      ),
    );
  });

  it('sets up web analytics', async () => {
    await eventually(() => {
      expect(store.getActions()).toContainEqual(registerAnalytics('123'));
    });
  });

  it('sets up user', async () => {
    await eventually(() => {
      expect(store.getActions()).toContainEqual(
        userDetailsFetched({
          analyticsId: '123',
          authenticated: true,
          email: 'bob@someone.com',
          firstName: 'Bob',
          id: 'user-id',
          lastName: 'Someone',
          links: {
            self: new Link({
              href: 'http://localhost/v1/users/user-id',
            } as RawLink),
          },
        }),
      );
    });
  });
});
