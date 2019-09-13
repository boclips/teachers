import { push } from 'connected-react-router';
import configureStore from 'redux-mock-store';
import { links, userResponse } from '../../../../../test-support/api-responses';
import ApiStub from '../../../../../test-support/ApiStub';
import eventually from '../../../../../test-support/eventually';
import { Link, RawLink } from '../../../../types/Link';
import { storeCollectionsAction } from '../../../collection/redux/actions/storeCollectionsAction';
import { fetchTagsAction } from '../../../common/tags/redux/actions/fetchTagsAction';
import { fetchDisciplinesAction } from '../../../disciplines/redux/actions/fetchDisciplinesAction';
import { registerAnalytics } from '../actions/registerAnalytics';
import { userDetailsFetched } from '../actions/userDetailsFetched';
import { userLoggedIn } from '../actions/userLoggedIn';
import onStoreLoginMiddleware from './onLoginMiddleware';
import onRegisterAnalyticsMiddleware from './onRegisterAnalyticsMiddleware';

jest.mock('../../../searchBar/redux/dispatchSearchActions');
jest.mock('../../../../services/analytics/AnalyticsFactory');
jest.mock('../../../../services/users/updateUser');

const mockStore = configureStore<{}>([
  onStoreLoginMiddleware,
  onRegisterAnalyticsMiddleware,
]);
const store = mockStore({
  apiPrefix: 'https://api.example.com',
});

beforeEach(() => {
  store.clearActions();
});

describe('on store login', () => {
  describe('when account needs to be activated', () => {
    beforeEach(() => {
      new ApiStub({
        _links: {
          ...links._links,
          activate: { href: 'https://api.example.com/v1/activate' },
        },
      })
        .fetchUser(userResponse())
        .fetchCollections();

      store.dispatch(userLoggedIn());
    });

    it('fetches my collections', async () => {
      await eventually(() => {
        expect(store.getActions().map(action => action.type)).toContain(
          storeCollectionsAction({
            collections: undefined,
            key: 'myCollections',
          }).type,
        );
      });
    });

    it('fetches disciplines', async () => {
      await eventually(() => {
        expect(store.getActions().map(action => action.type)).toContain(
          fetchDisciplinesAction().type,
        );
      });
    });

    it('fetches tags', async () => {
      await eventually(() => {
        expect(store.getActions().map(action => action.type)).toContain(
          fetchTagsAction().type,
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
            email: 'bob@someone.com',
            firstName: 'Bob',
            subjects: ['1'],
            ages: [1, 2, 3, 4],
            id: 'my-user-id',
            lastName: 'Someone',
            links: {
              self: new Link({
                href: 'http://localhost/v1/users/my-user-id',
              } as RawLink),
            },
          }),
        );
      });
    });

    it('redirects to the onboarding page', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(push('/onboarding'));
      });
    });
  });

  describe('when account already activated', () => {
    beforeEach(() => {
      new ApiStub({
        _links: {
          ...links._links,
          activate: undefined,
        },
      })
        .fetchUser(userResponse())
        .fetchCollections();

      store.dispatch(userLoggedIn());
    });

    it('does not redirect to the onboarding page', async () => {
      await eventually(() => {
        expect(store.getActions()).toContainEqual(registerAnalytics('123')); // Necessary to avoid false positives
        expect(store.getActions()).not.toContainEqual(push('/onboarding'));
      });
    });
  });
});
