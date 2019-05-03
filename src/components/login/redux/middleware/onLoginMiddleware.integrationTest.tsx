import Mock = jest.Mock;
import configureStore from 'redux-mock-store';
import ApiStub from '../../../../../test-support/ApiStub';
import eventually from '../../../../../test-support/eventually';
import KeycloakInstanceFake from '../../../../../test-support/KeycloakInstanceFake';
import {
  links,
  userResponse,
} from '../../../../../test-support/video-service-responses';
import activateUser from '../../../../services/users/activateUser';
import { Link, RawLink } from '../../../../types/Link';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { registerAnalytics } from '../actions/registerAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';
import onStoreLoginMiddleware from './onLoginMiddleware';
import onRegisterAnalyticsMiddleware from './onRegisterAnalyticsMiddleware';

jest.mock('../../../searchBar/redux/dispatchSearchVideoAction');
jest.mock('../../../../services/analytics/AnalyticsFactory');
jest.mock('../../../../services/users/activateUser');

const activateUserMock = activateUser as Mock;

const mockStore = configureStore<{}>([
  onStoreLoginMiddleware,
  onRegisterAnalyticsMiddleware,
]);
const store = mockStore({});

describe('on store login', () => {
  beforeEach(() => {
    new ApiStub({ ...links, activate: { href: '/v1/activate' } })
      .fetchUser(userResponse())
      .fetchCollections();

    store.dispatch(
      userLoggedIn(
        new KeycloakInstanceFake({
          userId: 'user-id',
        }),
      ),
    );
  });

  it('fetches my collections', async () => {
    await eventually(() => {
      expect(store.getActions().map(action => action.type)).toContain(
        storeCollectionsAction({ collections: undefined, key: 'myCollections' })
          .type,
      );
    });
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

  it('activates account', async () => {
    await eventually(() => {
      expect(activateUserMock).toBeCalled();
    });
  });
});
